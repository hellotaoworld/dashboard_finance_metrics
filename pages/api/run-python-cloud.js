import { spawn } from 'child_process';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { input3, dbCredentials } = req.body;

        const pythonCommand = 'py';
        const scriptPath = input3 + 'run_engine_update_cloud.py';

        if (!input3) {
            res.status(400).json({ error: 'Python directory (input3) is required.' });
            return;
        }
        console.log('Python Command:', pythonCommand);
        console.log('Script Path:', scriptPath);

        const pythonProcess = spawn(pythonCommand, [scriptPath], {
            cwd: input3, // Set working directory to the script's folder
            env: { ...process.env, ...dbCredentials },
        });

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        pythonProcess.stdout.on('data', (data) => {
            const lines = data.toString().split('\n').filter((line) => line.trim()); // Log 
            lines.forEach((line) => res.write(`data: ${line}\n\n`));
            res.flush();
        });

        pythonProcess.stderr.on('data', (data) => {
            const lines = data.toString().split('\n').filter((line) => line.trim()); // Log 
            lines.forEach((line) => res.write(`data: ${line}\n\n`));
            res.flush();
            //console.error(`Python Script Error: ${data.toString()}`); // Log the error to server console
            //res.write(`data: ERROR: ${data.toString()}\n\n`);
        });

        pythonProcess.on('close', (code) => {
            res.write(`data: Script finished with exit code ${code}\n\n`);
            res.end();
        });

        pythonProcess.on('error', (err) => {
            res.write(`data: ERROR: ${err.message}\n\n`);
            res.end();
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}