import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className='h-screen items-center justify-items-center p-8 pb-20 gap-16 sm:p-20'>
			<main className='flex flex-col gap-4 items-center justify-center'>
				<div className='flex flex-col items-center gap-4'>
					<h1 className='text-6xl'>Latex Editor</h1>
				</div>
				<div className='flex gap-4 justify-center items-center'>
					<Button>
						<Link href='/katex'>KaTex</Link>
					</Button>
					<Button>
						<Link href='/mathjax'>MathJax</Link>
					</Button>
					<Button>
						<Link href='/claude'>Claude</Link>
					</Button>
				</div>
			</main>
		</div>
	);
}
