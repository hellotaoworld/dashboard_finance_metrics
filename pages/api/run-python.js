import { spawn } from 'child_process';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { input1, input2 } = req.body;

        // Default to "All" if inputs are empty
        const dropdown1 = input1.length > 0 ? input1.join(',') : 'All';
        const dropdown2 = input2.length > 0 ? input2.join(',') : 'All';

        const pythonExecutable = 'D:/tao_project/valuation_engine/py';
        const scriptPath = 'D:/tao_project/valuation_engine/py/run_engine_company_year.py';

        const pythonProcess = spawn(pythonExecutable, [scriptPath, dropdown1, dropdown2]);

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        pythonProcess.stdout.on('data', (data) => {
            res.write(`data: ${data.toString()}\n\n`);
        });

        pythonProcess.stderr.on('data', (data) => {
            res.write(`data: ERROR: ${data.toString()}\n\n`);
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