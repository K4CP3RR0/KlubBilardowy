import { useEffect } from 'react';

export const useTitle = (title: string) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = `${title} | Klub Bilardowy`;
        return () => {document.title = previousTitle;};
    }, [title]);
};