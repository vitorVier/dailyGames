import Container from "@/components/container";
import { GameCard } from "@/components/gameCard";
import { Input } from "@/components/input";
import { GameProps } from "@/utils/types/game";

async function getData(title: string) {
    try {
        const decodeTitle = decodeURI(title)
        const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`)
        console.log(res)
        return res.json();
    } catch(err) {
        return null
    }
}

export default async function Search({ 
    params
} : {
    params: Promise<{ title: string }>
}) {
    
    const { title } = await params;
    const games: GameProps[] = await getData(title);

    return (
        <main className="w-full text-black">
            <Container>
                <Input />

                <h1 className="font-bold text-xl mt-8 mb-5">Veja o que encontramos na nossa base!</h1>

                {( !games || games.length === 0) && (
                    <p>Esse jogo não foi encontrado!</p>
                )}

                <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {games && games.length > 0 && games.map((game) => (
                        <GameCard key={game.id} data={game}/>
                    ))}
                </section>
            </Container>
        </main>
    )
}