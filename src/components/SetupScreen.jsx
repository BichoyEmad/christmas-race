import React, { useState } from 'react';
import { parseExcelFile } from '../utils/excelParser';
import { Upload, Play } from 'lucide-react';

const SetupScreen = ({ onStartGame }) => {
    const [teamAName, setTeamAName] = useState('Papa Noel Red');
    const [teamBName, setTeamBName] = useState('Papa Noel Green');
    const [teamAQuestions, setTeamAQuestions] = useState(null);
    const [teamBQuestions, setTeamBQuestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileUpload = async (e, team) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            setError('');
            const questions = await parseExcelFile(file);
            if (team === 'A') setTeamAQuestions(questions);
            else setTeamBQuestions(questions);
        } catch (err) {
            console.error(err);
            setError(`Failed to parse file for Team ${team}. Please ensure it's a valid Excel file.`);
        } finally {
            setLoading(false);
        }
    };

    const handleStart = () => {
        if (!teamAQuestions || !teamBQuestions) {
            setError('Please upload questions for both teams.');
            return;
        }
        if (teamAQuestions.length === 0 || teamBQuestions.length === 0) {
            setError('One of the files has no questions.');
            return;
        }
        onStartGame({
            teamA: { name: teamAName, questions: teamAQuestions },
            teamB: { name: teamBName, questions: teamBQuestions },
        });
    };

    const inputStyle = {
        padding: '0.8rem',
        marginBottom: '1rem',
        width: '100%',
        borderRadius: '10px',
        border: '1px solid rgba(0,0,0,0.2)',
        background: 'rgba(255,255,255,0.5)',
        color: '#1a1a1a',
        fontSize: '1rem',
        outline: 'none',
        fontWeight: '500'
    };

    const fileLabelStyle = (loaded) => ({
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        justifyContent: 'center',
        padding: '0.8rem',
        border: `2px dashed ${loaded ? '#2F5233' : 'rgba(0,0,0,0.3)'}`,
        borderRadius: '10px',
        color: loaded ? '#2F5233' : '#444',
        fontWeight: loaded ? 'bold' : 'normal',
        transition: 'all 0.3s',
        background: loaded ? 'rgba(76, 175, 80, 0.1)' : 'transparent'
    });

    return (
        <div className="glass-panel" style={{
            textAlign: 'center',
            padding: '3rem',
            maxWidth: '700px',
            width: '90%',
            background: 'rgba(255, 255, 255, 0.5)', // Slightly more opaque for readability
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
            <h1 style={{
                color: '#1a1a1a',
                marginBottom: '2rem',
                fontSize: '2.5rem',
                textShadow: '0 1px 2px rgba(255,255,255,0.5)'
            }}>
                🎅 Christmas Race Setup 🎄
            </h1>

            {error && <div style={{
                color: '#721c24',
                marginBottom: '1rem',
                padding: '0.5rem',
                background: '#f8d7da',
                borderRadius: '5px',
                border: '1px solid #f5c6cb'
            }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
                <div className="team-setup">
                    {/* Darker Red for better visibility against light bg */}
                    <h2 style={{ color: '#D42426', textShadow: 'none', marginBottom: '1rem' }}>Team Red</h2>
                    <input
                        type="text"
                        value={teamAName}
                        onChange={(e) => setTeamAName(e.target.value)}
                        style={inputStyle}
                    />
                    <div className="file-upload">
                        <label htmlFor="file-a" style={fileLabelStyle(!!teamAQuestions)}>
                            <Upload size={20} />
                            {teamAQuestions ? `${teamAQuestions.length} Questions Loaded` : 'Upload Excel'}
                        </label>
                        <input id="file-a" type="file" accept=".xlsx, .xls" onChange={(e) => handleFileUpload(e, 'A')} style={{ display: 'none' }} />
                    </div>
                </div>

                <div className="team-setup">
                    {/* Darker Green for better visibility */}
                    <h2 style={{ color: '#2F5233', textShadow: 'none', marginBottom: '1rem' }}>Team Green</h2>
                    <input
                        type="text"
                        value={teamBName}
                        onChange={(e) => setTeamBName(e.target.value)}
                        style={inputStyle}
                    />
                    <div className="file-upload">
                        <label htmlFor="file-b" style={fileLabelStyle(!!teamBQuestions)}>
                            <Upload size={20} />
                            {teamBQuestions ? `${teamBQuestions.length} Questions Loaded` : 'Upload Excel'}
                        </label>
                        <input id="file-b" type="file" accept=".xlsx, .xls" onChange={(e) => handleFileUpload(e, 'B')} style={{ display: 'none' }} />
                    </div>
                </div>
            </div>

            <button
                onClick={handleStart}
                disabled={loading}
                style={{
                    background: 'linear-gradient(135deg, #D42426 0%, #2F5233 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 4rem',
                    fontSize: '1.4rem',
                    borderRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    margin: '0 auto',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
            >
                <Play size={28} />
                Start Race
            </button>
        </div>
    );
};

export default SetupScreen;
