import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Appbar from './Appbar';
import { REACT_APP_BACKEND_URL } from '@/config';

const PublishBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [publishing, setPublishing] = useState(false);
    const navigate = useNavigate();

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Please fill in both title and content');
            return;
        }

        setPublishing(true);
        try {
            const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            //@ts-ignore
            if (response.data.id) {
                //@ts-ignore
                navigate(`/blog/${response.data.id}`);
            } else {
                throw new Error('Failed to get blog ID after publishing');
            }
            
        } catch (error) {
            console.error('Failed to publish blog:', error);
            alert('Failed to publish blog. Please try again.');
        } finally {
            setPublishing(false);
        }
        
    };

    return (
        <div>
            <Appbar />
            <div className="max-w-2xl mx-auto mt-8 p-4">
                <h1 className="text-3xl font-bold mb-4">Publish a New Blog</h1>
                <input
                    type="text"
                    placeholder="Enter your blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <textarea
                    placeholder="Write your blog content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 mb-4 border rounded h-64"
                />
                <button
                    onClick={handlePublish}
                    disabled={publishing}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {publishing ? 'Publishing...' : 'Publish'}
                </button>
            </div>
        </div>
    );
};

export default PublishBlog;