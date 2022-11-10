import { useRouter } from "next/router"

export default function SuaPaginaNext() {
    const router = useRouter();
    const videoId = router.query.v
    console.log(videoId)
    console.log(router)

    return (
        <div>
            Olhe o console
        </div>
    )
}