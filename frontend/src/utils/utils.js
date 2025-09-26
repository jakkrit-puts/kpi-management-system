import dayjs from 'dayjs';

export const formatDate = (date) => {

    if (!date) return;

    const dateFormat = dayjs(date).format('DD/MM/YYYY');

    return dateFormat
}  


