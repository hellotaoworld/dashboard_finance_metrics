import React, { useEffect, useState, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill without SSR
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

// Wrapper component to forward the ref
const CustomQuill = forwardRef((props, ref) => {
    const [EditorComponent, setEditorComponent] = useState(null);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'], // Formatting options
            [{ color: [] }, { background: [] }], // Text and background color
            [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            ['link'], // Links
            ['clean'], // Remove formatting
        ],
    };

    useEffect(() => {
        const loadEditor = async () => {
            const { default: LoadedQuill } = await import('react-quill');
            setEditorComponent(() => LoadedQuill);
        };
        loadEditor();
    }, []);

    if (!EditorComponent) {
        return <p>Loading editor...</p>; // Fallback during loading
    }

    return (
        <div className="quill-container"> {/* Add the wrapper with quill-container class */}
            <EditorComponent {...props} ref={ref} modules={modules} />
        </div>
    );
});

CustomQuill.displayName = 'CustomQuill';

export default CustomQuill;