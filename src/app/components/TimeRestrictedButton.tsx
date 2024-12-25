'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2, Power } from 'lucide-react'
import {toast} from "@/hooks/use-toast";

const COOLDOWN_TIME = 4 * 60 * 60 * 1000 // 4 hours in milliseconds

export default function TimeRestrictedButton() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkButtonStatus = () => {
      const lastClickTime = localStorage.getItem('lastClickTime')
      if (lastClickTime) {
        const timeSinceLastClick = Date.now() - parseInt(lastClickTime)
        if (timeSinceLastClick < COOLDOWN_TIME) {
          setIsDisabled(true)
          setTimeLeft(COOLDOWN_TIME - timeSinceLastClick)
        } else {
          setIsDisabled(false)
          setTimeLeft(0)
        }
      } else {
        setIsDisabled(false)
        setTimeLeft(0)
      }
    }

    checkButtonStatus()
    const interval = setInterval(checkButtonStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://labs.vocareum.com/util/vcput.php?a=startaws&stepid=3553566&version=0&mode=s&type=1&vockey=659bc584182c98ad695f682eac2216d29633bfb95c10a497b837e39328a1c90b', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'accept-language': 'es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5,es-CL;q=0.4,es-MX;q=0.3',
          'cookie': 'userid=1131941; logintoken=659bc584182c98ad695f682eac2216d29633bfb95c10a497b837e39328a1c90b; tokenExpire=1735197102; usertoken=659bc584182c98ad695f682eac2216d29633bfb95c10a497b837e39328a1c90b; t2fausers=659bc584182c98ad695f682eac2216d29633bfb95c10a497b837e39328a1c90b; usingLTI=1; myfolder=104a6b0a9f5eb67016f69c1cacc60d7b; currentcourse=vc_2_0_528a3090org265_353; currentassignment=3553565; currentcourse_id=138947',
          'priority': 'u=1, i',
          'referer': 'https://labs.vocareum.com/main/main.php?m=clabide&mode=s&asnid=3553565&stepid=3553566&hideNavBar=1',
          'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
          'x-requested-with': 'XMLHttpRequest',
        },
      })

      if (!response.ok) throw new Error('Error al iniciar servicios')

      const data = await response.json()

      if (data.status === "success") {
        const match = data.msg.match(/Remaining session time: (\d+):(\d+):(\d+)/)
        if (match) {
          const hours = parseInt(match[1], 10)
          const minutes = parseInt(match[2], 10)
          const seconds = parseInt(match[3], 10)
          const remainingTime = (hours * 60 * 60 + minutes * 60 + seconds) * 1000

          localStorage.setItem('lastClickTime', Date.now().toString())
          setTimeLeft(remainingTime)
          setIsDisabled(true)

          toast({
            title: "Servicios iniciados",
            description: `Tiempo de sesión restante: ${hours}h ${minutes}m ${seconds}s`,
          })
        } else {
          throw new Error('No se pudo determinar el tiempo de sesión restante')
        }
      } else {
        throw new Error(data.msg || 'Error desconocido al iniciar servicios')
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error desconocido al iniciar servicios",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / (60 * 60 * 1000))
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
      <Button
        onClick={handleClick}
        disabled={isDisabled || loading}
        className="w-full py-8 text-xl font-bold"
        size="lg"
      >
        {loading ? (
          <Loader2 className="animate-spin mr-2 h-6 w-6" />
        ) : (
          <Power className="mr-2 h-6 w-6" />
        )}
        {isDisabled ? 'Servicios Iniciados' : 'Iniciar Servicios'}
      </Button>
      {isDisabled && (
        <span className="text-lg text-gray-500">
          Tiempo restante: {formatTimeLeft()}
        </span>
      )}
    </div>
  )
}

