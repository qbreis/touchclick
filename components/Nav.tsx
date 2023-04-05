import Link from 'next/link';

export default function Nav({ onClickRecording }: any) {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                {onClickRecording && (
                    <li>
                        <Link href="" onClick={onClickRecording}>
                            Record
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}
