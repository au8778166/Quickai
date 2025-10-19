import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react'

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData)
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold text-slate-700">Creations</h1>

      {/* Gallery container */}
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll p-4 flex flex-wrap gap-4">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group w-full sm:w-[48%] lg:w-[32%] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg relative">
              <img
                src={creation.content}
                alt=""
                className="w-full h-full object-cover"
              />

              {/* Prompt and like (visible only on hover) */}
              <div
                className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 
                transition-all duration-300 flex justify-between items-center px-3 py-2"
              >
                <p className="text-sm text-white bg-black/60 px-2 py-1 rounded-md truncate w-3/4">
                  {creation.prompt}
                </p>

                <div className="flex gap-1 items-center text-white">
                  <p>{creation.likes?.length || 0}</p>
                  <Heart
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer transition 
                      ${
                        creation.likes?.includes(user?.id)
                          ? 'fill-red-500 text-red-600'
                          : 'text-white'
                      }`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
