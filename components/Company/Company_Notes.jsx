import { Accordion, AccordionItem } from '@nextui-org/react'
import React, { useEffect, useState, useRef } from 'react'
import { useTheme } from "next-themes";
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import CustomQuill from './CustomQuill';



const Company_Notes = ({ noteDetails, companyOverview }) => {

    const quillRef = useRef(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [timestamp, setTimestamp] = useState('');

    useEffect(() => {
        if (noteDetails?.notes) {
            //console.log(noteDetails.notes)
            try {
                const decodedContent = Buffer.from(noteDetails.notes, 'base64').toString('utf-8');
                const parsedContent = JSON.parse(decodedContent); // Parse Delta object
                setContent(parsedContent || '');
                setTimestamp(noteDetails.update_timestamp || '');
                //console.log('Decoded Content:', parsedContent);
                setLoading(false);
            } catch (error) {
                console.error('Error parsing notes:', error);
                setContent('');
            }
        }
    }, [noteDetails]);

    const uploadToDatabase = async (v) => {
        try {

            const editor = quillRef.current.getEditor();
            const editorContent = editor.getContents();
            setContent(editorContent);
            const encodedContent = JSON.stringify(editorContent);
            const data = {
                type: 'company',
                company: v.company_name,
                cik: v.cik,
                sic: 0,
                notes: encodedContent
            }
            await axios
                .put('/api/companies/save-notes', data)
                .catch((error) => console.error('Error updating notes:', error));

        } catch (error) {
            console.error('Error saving notes:', error);
        }
    };

    // useEffect(() => {
    //     // Auto-save every 5 seconds
    //     const autoSave = setInterval(() => {
    //         uploadToDatabase(companyOverview);
    //     }, 10000);

    //     return () => clearInterval(autoSave);
    // }, [companyOverview, content]);

    //if (loading) return <p>Loading content...</p>;

    const HeaderWithButton = (
        <div className='mx-2'>
            <span>📝 Notepad</span>
            <Button
                size="sm" color="primary" variant="light"
                onClick={() => uploadToDatabase(companyOverview)} className='mx-2'
            >
                <span className='text-primary-600'>Save</span>
            </Button>
            <span className='text-default-600 text-xs'> Last updated: {timestamp ? timestamp : `N/A`}</span>
        </div>
    );
    return (
        <div className="mx-1">
            <Accordion isCompact variant="bordered">
                <AccordionItem key="1" aria-label="Notes" title={HeaderWithButton}>
                    <CustomQuill
                        value={content}
                        ref={quillRef}
                        theme="snow"
                        placeholder="Start typing here..."
                        style={{ height: '300px' }}
                    />
                </AccordionItem>
            </Accordion>


        </div >
    )
}

export default Company_Notes