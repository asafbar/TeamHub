const avatarImages = import.meta.glob(
    "../assets/avatars/*.svg",
    {
        eager: true,
        import: "default",
        query: "?url"
    }
) as Record<string, string>

export type AvatarOption = {
    name: string
    url: string
}

export function getAvatarUrl(avatar: string): string | undefined {
    return avatarImages[`../assets/avatars/${avatar}`]
}

export function getAvatarOptions(): AvatarOption[] {
    return Object.entries(avatarImages).map(([path, url]) => ({
        name: path.substring(path.lastIndexOf("/") + 1),
        url
    }))
}