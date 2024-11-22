

const statusData = [
    {
        id: 1,
        name: 'Mary Smith',
        avatar: '',
        status: 'Online',
        content: [
            {
                id: 1,
                message: 'Lovely moment',
                timestamp: '2022-01-01T07:00:00Z',
                status_image: [
                    '/status1.jpg',
                ],
                expiry_time: '2022-01-01T07',
                is_muted: false,

            },
            {
                id: 2,
                message: 'Thanks',
                timestamp: '2022-01-01T07:00:00Z',
                status_image: [
                    '/status3.webp',
                ],
                expiry_time: '2022-01-01T07',
                is_muted: false,

            },
        ]
    },
    {
        id: 2,
        name: 'John Doe',
        avatar: '',
        status: 'Online',
        content: [
            {
                id: 1,
                message: 'Lovely moment',
                timestamp: '2022-01-01T07:00:00Z',
                status_image: [
                    '/status2.jpg',
                ],
                expiry_time: '2022-01-01T07',
                is_muted: false,

            },

        ]
    },
]


export default statusData;