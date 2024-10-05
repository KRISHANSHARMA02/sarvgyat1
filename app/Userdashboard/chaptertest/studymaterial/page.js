"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import AOS from 'aos';
import Image from 'next/image';
import picture from '@/public/studentblog2.jpg';

const Pdfdata = () => {
    const { data: session, status } = useSession();
    const [files, setFiles] = useState([]);
    const [grade, setGrade] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPdfUrl, setSelectedPdfUrl] = useState(null); // State for selected PDF URL
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    useEffect(() => {
        // Initialize AOS
        AOS.init({ duration: 600 });
    }, []);

    useEffect(() => {
        const fetchGrade = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                try {
                    const response = await axios.post(
                        'https://learnospherebackend.singhbrothers.ltd/api/route/getStudentByEmail',
                        { gmail: session.user.email }
                    );
                    console.log('Profile response:', response.data);

                    const { grade } = response.data; 
                    if (grade) {
                        setGrade(grade);
                        console.log("Grade extracted:", grade);
                    } else {
                        console.error("Grade not found in profile data.");
                    }
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            }
        };

        fetchGrade();
    }, [session, status]);

    useEffect(() => {
        const fetchFiles = async () => {
            if (grade) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://learnospherebackend.singhbrothers.ltd/api/route/getstudentdata?grade=${grade}`);
                    setFiles(response.data);
                    console.log('Fetched files:', response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('No grade found in profile data.');
            }
        };

        if (status === 'authenticated' && grade) {
            fetchFiles();
        }
    }, [grade, status]);

    const handleView = (pdfUrl) => {
        setSelectedPdfUrl(pdfUrl); // Set the URL for the selected PDF
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
        setSelectedPdfUrl(null); // Reset the selected PDF URL
    };

    return (
        <div className='flex gap-4 px-14 pt-4 flex-wrap'>
            {loading && <p>Loading...</p>}

            {files.length > 0 ? (
                files.map((file) => (
                    <div key={file.id} className="bg-gray-200 rounded-lg p-4 w-[14vw] flex flex-wrap">
                        <div>
                            <Image className='h-40 w-40' src={picture} alt='' />
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            <p className="font-bold">Title: {file.title}</p>
                            <p className="font-semibold">Medium: {file.category}</p>
                            <p className="font-semibold">Subject: {file.selectedSubject}</p>
                            <button
                                className="bg-orange-500 rounded-md p-2 text-white font-bold"
                                onClick={() => handleView(file.pdfUrl)}
                            >
                                View File
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No files available.</p>
            )}

            {/* Modal for PDF Viewing */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] overflow-auto">
                        <button onClick={closeModal} className="text-red-500">Close</button>
                        {selectedPdfUrl && (
                            <iframe
                                src={selectedPdfUrl}
                                width="100%"
                                height="600px"
                                title="PDF Viewer"
                                className="border-none"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pdfdata;
