import { Languages } from '@/constants/types';
import { FaCheckCircle } from 'react-icons/fa';
import { getDictionary } from '../dictionaries';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ lang: Languages }>
}

export const metadata: Metadata = {
    title: 'Home',
    description: 'Home page of next 15 internationalization',
};

const Page = async ({ params }: Props) => {
    const lang = (await params).lang;
    const dict = await getDictionary(lang)
    const { title, description, points } = dict.pages.home;

    const Points = () => {
        if (!points.length) return null;
        return points.map((point: string, index: number) => (
            <li key={index} className="mb-2 flex gap-1.5 items-center ">
                <FaCheckCircle className='w-5 h-5 text-purple-500' />
                {point}
            </li>
        ))
    }

    return (
        <div className="p-6 text-gray-800 w-fit mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600">
                {title}
            </h1>
            <p className="mb-6 text-2xl">{description}</p>
            <ul className="list-inside">
                <Points />
            </ul>
        </div>
    )
}

export default Page