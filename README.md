#  ChatWeb – Real-Time Anonymous Chat App

A scalable real-time chat application that enables anonymous communication between users using WebSockets.

##  Tech Stack
- React.js + TypeScript
- Node.js + Express
- Socket.io (WebSockets)

##  Features
-  Random user matching (Omegle-style)
-  Real-time messaging (low latency)
-  Anonymous chat (no authentication)
-  “Next” user functionality
-  Event-driven architecture

##  System Design Highlights
- Queue-based user matching
- Room-based communication
- Scalable socket architecture
- Separation of concerns (services, socket handlers)

##  Run Locally

### Backend
```bash
cd server
npm install
npx ts-node src/index.ts
