import * as XLSX from 'xlsx';

export const parseExcelFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                // Use default sheet_to_json which creates Key-Value pairs based on the first row (headers)
                // This is much safer than assuming strict column order.
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

                // We need to map this dynamic object to our Question structure.
                // We'll search for keys that look like "Question", "Option", "Answer".

                const questions = jsonData.map((row) => {
                    const keys = Object.keys(row);

                    // improved fuzzy matching for column names using basic heuristics
                    const questionKey = keys.find(k => k.toLowerCase().includes('question') || k.toLowerCase().includes('pregunta'));
                    const answerKey = keys.find(k => k.toLowerCase().includes('correct') || k.toLowerCase().includes('answer') || k.toLowerCase().includes('respuesta'));

                    // Find all option keys (usually contain "Option" or "A", "B", "C" or look like options)
                    // Let's assume standard "Option 1" style or A, B, C cols.
                    // Actually, let's just grab keys that aren't question or answer.
                    // Or specific "Option A" etc.

                    // Simple approach: Filter keys that contain "Option" or match A/B/C logic if specific headers used.
                    // Let's look for keys containing "Option" or "Opcion" or single letters A, B, C if they exist?
                    // Safe bet: "Option 1", "Option 2", "Option 3" or similar.

                    const optionKeys = keys.filter(k =>
                        !k.toLowerCase().includes('question') &&
                        !k.toLowerCase().includes('pregunta') &&
                        !k.toLowerCase().includes('correct') &&
                        !k.toLowerCase().includes('answer') &&
                        !k.toLowerCase().includes('respuesta') &&
                        row[k] !== "" // Ignore empty cells
                    );

                    // Sort options if they have numbers in them to keep order?
                    // Just take them as is for now.

                    return {
                        question: row[questionKey],
                        options: optionKeys.map(k => row[k]),
                        correctAnswer: row[answerKey] ? String(row[answerKey]).trim().toUpperCase() : '',
                    };
                }).filter(q => q.question && q.options.length > 0 && q.correctAnswer);

                resolve(questions);
            } catch (err) {
                reject(err);
            }
        };

        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
    });
};
