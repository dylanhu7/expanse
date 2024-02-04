# Expanse

Experience your work in a whole new space. Expanse is an accessible toolkit for anyone to create, edit, and participate in 3D VR and MR spaces.

### Inspiration

The cosmos ignites our imaginations, but exploring it physically remains a privilege for few. Inspired by the recent wave of mixed reality spatial computing devices (i.e., the Apple Vision Pro and the Meta Quest 3), we envisioned Expanse - a tool that breaks limitations and **empowers everyone to create and experience immersive 3D spaces**, regardless of technical background.

### What it does:

Experience your work in a whole new space. Expanse is an accessible toolkit for anyone to create, edit, and participate in 3D VR and MR spaces.
Expanse is an accessible web app for designing virtual reality and mixed reality exhibits with ease. It offers a user-friendly drag-and-drop interface, eliminating the need for coding. With Expanse, you can:

- **Craft captivating experiences:** Design virtual floorplans, interactive exhibits, stunning art showcases, and more. Imagine stepping into your dream home before it's built, touring a historical landmark you might never visit, or experiencing a friend's artwork like you're standing amidst it.
- **Unleash creativity across fields:** Architects, educators, artists, businesses - Expanse empowers anyone to translate their ideas into immersive experiences. Showcase portfolios, conduct virtual training sessions, host engaging events, or simply let your imagination run wild.
- **Embrace spatial compatibility:** Designed for the Apple Vision Pro and Meta Quest 3, Expanse leverages the WebXR API, ensuring your creations are accessible across all mainstream XR platforms. Works on any device with a web browser, no app installation required.

### How we built it:

- **Next.js**, **React**, and **TypeScript** provided a solid foundation for the intuitive user interface and drag-and-drop functionality.
- **WebXR** and **three.js** integration enabled seamless interaction with spatial computing devices.
- **PostgreSQL** served as the database, while **tRPC** and **Drizzle** facilitated efficient data management and interaction.
- **Vercel** ensured smooth deployment and the potential for Expanse to reach a global audience. We also used features like Vercel Blob for image uploads and Vercel Postgres for database hosting.

### Challenges we ran into:

- The WebXR libraries and APIs are still evolving, and many libraries we tried were outdated, not well-documented, or missing the features we needed. We spent a lot of time researching and experimenting before we settled on the libraries we used.
- WebXR has a lot of constraints and limitations, since it cannot access native device-specific features such as depth sensors. As a result, we couldn't take full advantage of the depth sensor in mixed reality experiences, but had to make do with the capabilities of the WebXR API. Given more time, we would have tried to build a native app to take full advantage of the device's specific hardware capabilities.

### Accomplishments that we're proud of:

- **Accessibility:** We were able to make spatial creation accessible to non-technical users.
- **Cross-platform compatibility:** Expanse works across leading XR devices, expanding its reach significantly. Additionally, it's accessible on any device with a web browser using their keyboard and mouse.
- **Intuitive interface:** The drag-and-drop functionality empowers users to create XR content without coding knowledge.

### What we learned:

- We used a lot of technologies that were new to us, such as WebXR, Drizzle, Vercel Blob, and React-XR. We got to learn about these libraries and how to use them effectively. We had used ORMs like Prisma before, but this was the first time we had used the Drizzle ORM, which has tighter integration with TypeScript and SQL, and can be deployed to the edge. We got to use Vercel Blob for uploading image files from the client to the server.
- We learned that WebXR comes with a lot of limitations compared to native apps, and that we need to be mindful of these limitations when designing experiences. However, the iteration speed during development is much faster than native apps, and the ability to deploy to a web server is a huge advantage.

### What's next for Expanse:

- **Expanding functionality:** We envision features like collaborative creation, real-time multiplayer interaction, and educational tools.
- **Community building:** Fostering a vibrant user community where creators can share, collaborate, and inspire each other.
- **Industry partnerships:** Exploring collaborations with educators, artists, and businesses to push the boundaries of immersive experiences.
