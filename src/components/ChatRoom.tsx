import { ScrollArea } from '@/components/ui/scroll-area'

export default function ChatRoom({ selectedRoom, setSelectedRoom, chatRooms }) {
    return (
      <div className="w-1/3 bg-white border-r">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chat Rooms</h2>
        </div>
        <ScrollArea className="h-[calc(100vh-73px)]">
            {chatRooms.map((room: any) => (
                <div
                key={room.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedRoom === room.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => setSelectedRoom(room.title)}
                >
                    <div className='flex item-center'>
                        <h3 className="text-sm font-medium">{room.title}</h3>
                    </div>
                </div>

        ))}
        </ScrollArea>
      </div>
    )
  }