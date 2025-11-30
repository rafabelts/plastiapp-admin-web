export function ProfileElement({ username }: { username: string }) {
    return (
        <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col items-center justify-center rounded-[50%] w-[40px] h-[40px] bg-blue-500/80">
                <p className="font-bold text-white text-2xl">{username.at(0)}</p>
            </div>
            <p className="text-2xl">{username}</p>
        </div>
    )
}
