export const powers = {
    remove: {
        name: 'Remove',
        description: "This is the first power.",
    },
    addbots: {
        name: 'Add Bots',
        description: "This is the first power.",
    }
}

export const Roles = [
    {
        id: "1",
        role: "admin",
        auth: "ADMIN",
        description: "Administrator",
        powers: [
            powers.remove, powers.addbots
        ]
    },
    {
        id: "2",
        role: "moderator",
        auth: "MODERATOR",
        description: "Moderator",
        powers: [powers.remove, powers.addbots]
    },
    {
        id: "3",
        role: "user",
        auth: "USER",
        description: "user",
        powers: [powers.remove, powers.addbots]

    },
    {
        id: "4",
        role: "default",
        auth: "DEFAULT",
        description: "default",
        powers: [powers.remove, powers.addbots]

    },
]