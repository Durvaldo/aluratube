import React from "react";
import config from "../config.json"
import styled from "styled-components"
import Menu from "../src/components/Menu/Index"
import { StyledTimeline } from "../src/components/Timeline"
import { videoService } from "../src/services/videoService";

function HomePage() {
    const service = videoService()
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        service
            .getAllVideos()
            .then((response) => {
                const novasPlaylists = {...playlists};
                response.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = []
                    }
                    novasPlaylists[video.playlist].push(video)
                })
                setPlaylists(novasPlaylists)
            })
    }, [])
   
    console.log("playlist feita", playlists)

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }} >
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header/>
                <Timeline searchVal={valorDoFiltro} playlists={playlists}/>
            </div>
        </>
    )
}
  
export default HomePage

// function Menu() {

//     return (
//         <div>Menu</div>
//     )
// }

// extensões
// vscode-styled-components
// prettier

const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    
    .user-banner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 230px;
    }
    .user-banner img {
        height: 100%;
        width: 100%;
        object-fit: cover
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px 32px;
        gap: 10px;
    }
    .user-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
`


function Header() {

    return (
        <StyledHeader>
            <div className="user-banner">
                <img  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80" />
            </div>
            <section className="user-info">
                <img className="user-img" src={`https://github.com/${config.Github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.Job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchVal, ...props}) {
    // console.log("Dentro do componente", props)
    const playlistNames = Object.keys(props.playlists)
    // Statment 
    // Retorno por expressao
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName]
                // console.log(videos)
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.titulo.toLowerCase()
                                    const searchValNormalized = searchVal.toLowerCase()
                                    return titleNormalized.includes(searchValNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb}/>
                                            <span>
                                                {video.titulo}
                                            </span>
                                        </a>
                                    )
                                }
                            )}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}