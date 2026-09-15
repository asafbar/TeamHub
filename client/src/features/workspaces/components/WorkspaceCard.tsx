import { useNavigate } from "react-router-dom"
import type { Workspace } from "../types/WorkspaceTypes"

type WorkspaceCardProps = {
    workspace: Workspace
}

function WorkspaceCard({ workspace }: WorkspaceCardProps) {

    const navigate = useNavigate()

    function handleClick() {
        navigate(`/workspaces/${workspace.id}`)
    }

    return (
        <div onClick={handleClick}>
            <h2>{workspace.name}</h2>
            <p>{workspace.description}</p>
        </div>
    )
}

export default WorkspaceCard