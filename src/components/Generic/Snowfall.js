import { memo } from "react"

function SnowfallBackground() {
    return (
        <div>
            {
                [...(new Array(50))].map((v, i) => <div className="snowflake" key={`${v}+${i}`} />)
            }
        </div>
    )
}

export default memo(SnowfallBackground)