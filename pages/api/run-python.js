import { spawn } from 'child_process';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { input1, input2, input3, dbCredentials } = req.body;

        // Default to "All" if inputs are empty
        const var1 = Array.isArray(input1) && input1.length > 0 ? input1.join(',') : 'All';
        const var2 = Array.isArray(input2) && input2.length > 0 ? input2.join(',') : 'All';

        const pythonCommand = 'py';
        const scriptPath = input3 + 'run_engine_company_year.py';

        if (!input3) {
            res.status(400).json({ error: 'Python directory (input3) is required.' });
            return;
        }
        console.log('Python Command:', pythonCommand);
        console.log('Script Path:', scriptPath);
        console.log('Input 1:', var1);
        console.log('Input 2:', var2);

        const pythonProcess = spawn(pythonCommand, [scriptPath, var1, var2], {
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