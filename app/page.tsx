import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  SendHorizontal,
  Monitor,
  Lightbulb,
  Leaf,
  MessageCircle,
  Clock,
  Users,
  Briefcase,
  Building2,
  BarChart,
  Check,
  Star,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Brain,
  HelpCircle,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Search,
  GraduationCap,
  BookOpen,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { motion, AnimatePresence } from "framer-motion"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const QuestionCard = ({
  index,
  question,
  onClick,
}: { index: number; question: { title: string; description: string }; onClick: (title: string) => void }) => {
  const getIcon = (title: string) => {
    switch (title) {
      case "¿IA en RRHH?":
        return Users
      case "¿Cómo empezar?":
        return Lightbulb
      case "¿Buscar empleo con IA?":
        return Search
      case "¿IA para tu carrera?":
        return GraduationCap
      case "¿Cómo formarte en IA?":
        return BookOpen
      default:
        return Brain
    }
  }

  const Icon = getIcon(question.title)

  return (
    <div className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-1rem)] flex-shrink-0 px-2">
      <Button
        variant="outline"
        className="relative bg-white hover:bg-teal-50 rounded-2xl p-6 text-center h-auto shadow-sm hover:shadow-md transition-all duration-200 border-teal-100 group w-full"
        onClick={() => onClick(question.title)}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-emerald-100/50 p-3 rounded-full">
            <Icon className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-2">{question.title}</p>
            <p className="text-sm text-gray-500">{question.description}</p>
          </div>
        </div>
        <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Button>
    </div>
  )
}

export default function Home() {
  const features = [
    {
      icon: Lightbulb,
      title: "Innovación y productividad",
      description:
        "Más del 40% de los líderes empresariales han reportado un aumento en la productividad gracias a la automatización impulsada por IA, mejorando significativamente la eficiencia operativa.",
      color: "bg-yellow-500",
    },
    {
      icon: Leaf,
      title: "Sostenibilidad y salud",
      description:
        "La IA está revolucionando el sector salud mediante diagnósticos más precisos y tratamientos personalizados, permitiendo un diagnóstico temprano de enfermedades complejas.",
      color: "bg-green-500",
    },
    {
      icon: MessageCircle,
      title: "Comunicación y educación",
      description:
        "Un 65% de los encuestados a nivel global considera esencial que los maestros reciban formación sobre el uso de IA en sus estrategias educativas.",
      color: "bg-purple-500",
    },
    {
      icon: Clock,
      title: "Oportunidad y tiempo",
      description:
        "Más del 50% de las grandes empresas planean utilizar IA para 2024, lo que significa que las habilidades relacionadas con esta tecnología serán esenciales para mantenerse relevante en el mercado laboral.",
      color: "bg-orange-500",
    },
  ]

  const questions = [
    { title: "¿IA en RRHH?", description: "Gestión moderna de personal" },
    { title: "¿Cómo empezar?", description: "Conceptos básicos de IA" },
    { title: "¿Buscar empleo con IA?", description: "Estrategias para candidatos" },
    { title: "¿IA para tu carrera?", description: "Herramientas y recursos clave" },
    { title: "¿Cómo formarte en IA?", description: "Cursos para profesionales RRHH" },
  ]

  const [currentIndices, setCurrentIndices] = useState([0])
  const [direction, setDirection] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)
  const [chatInput, setChatInput] = useState("")
  const [audience, setAudience] = useState<"job-seekers" | "companies">("job-seekers")
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = React.useRef<Slider>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3)
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2)
      } else {
        setVisibleCards(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleResize = () => updateArrowVisibility(audience)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [audience])

  const changeQuestion = (moveRight: boolean) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = prevIndices.map((index) => {
        if (moveRight) {
          return (index + visibleCards) % questions.length
        } else {
          return (index - visibleCards + questions.length) % questions.length
        }
      })
      return newIndices
    })
  }

  const handleQuestionClick = (question: string) => {
    switch (question) {
      case "¿IA en RRHH?":
        setChatInput("¿Cómo usar la IA en la gestión de Recursos Humanos?")
        break
      case "¿Cómo empezar?":
        setChatInput("¿Qué necesito saber para empezar con IA?")
        break
      case "¿Buscar empleo con IA?":
        setChatInput("¿Qué necesito saber para la buscar empleo con IA?")
        break
      case "¿IA para tu carrera?":
        setChatInput("¿Qué necesito saber sobre IA si soy una persona en búsqueda de empleo?")
        break
      case "¿Cómo formarte en IA?":
        setChatInput("¿Qué cursos me recomiendas en IA para le gestión de mis Recursos Humanos?")
        break
    }
  }

  const jobSeekersCourses = [
    {
      title: "Aplicación básica de la IA Generativa en el Trabajo",
      description:
        "Conoce qué es la inteligencia artificial y aprende usar herramientas aplicadas en situaciones de la vida cotidiana y el trabajo.",
      icon: Monitor,
      gradient: "from-emerald-500 to-teal-600",
      category: "Curso Básico",
    },
    {
      title: "Inteligencia Artificial para mujeres buscadoras de empleo",
      description: "Curso dirigido a personas que busquen empleo.",
      icon: Briefcase,
      gradient: "from-purple-500 to-pink-600",
      category: "Desarrollo Profesional",
    },
    {
      title: "Aplicación de la IA Generativa en el área de mercadotecnia",
      description:
        "Curso dirigido a personas que trabajen en un área de mercadotecnia donde aplicarán el uso de la IA para diseño y creación de materiales y campañas publicitarias.",
      icon: BarChart,
      gradient: "from-teal-500 to-cyan-600",
      category: "Marketing",
    },
  ]

  const companiesCourses = [
    {
      title: "Aplicación básica de la IA Generativa en el Trabajo",
      description:
        "Conoce qué es la inteligencia artificial y aprende usar herramientas aplicadas en situaciones de la vida cotidiana y el trabajo.",
      icon: Monitor,
      gradient: "from-emerald-500 to-teal-600",
      category: "Curso Básico",
    },
    {
      title: "Aplicación de IA Generativa para reclutamiento de talento",
      description:
        "Curso dirigido a personal de capital humano encargado de la elaboración de vacantes para que con el uso de la IA puedan desarrollar o mejorar perfiles de puestos.",
      icon: Users,
      gradient: "from-blue-500 to-indigo-600",
      category: "Recursos Humanos",
    },
    {
      title: "Aplicación de IA Generativa en la MiPyMe",
      description:
        "Curso dirigido a MiPyMes sobre la aplicación de herramientas de IA Generativa para procesos administrativos, mercadotecnia, legales, ventas y atención al cliente.",
      icon: Building2,
      gradient: "from-orange-500 to-red-600",
      category: "MiPyMes",
    },
    {
      title: "Aplicación de la IA Generativa en el área de mercadotecnia",
      description:
        "Curso dirigido a personas que trabajen en un área de mercadotecnia donde aplicarán el uso de la IA para diseño y creación de materiales y campañas publicitarias.",
      icon: BarChart,
      gradient: "from-teal-500 to-cyan-600",
      category: "Marketing",
    },
  ]

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  }

  const updateArrowVisibility = (selectedAudience: "job-seekers" | "companies") => {
    const courses = selectedAudience === "job-seekers" ? jobSeekersCourses : companiesCourses
    const arrowsContainer = document.querySelector(".slider-arrows")
    if (arrowsContainer) {
      if (window.innerWidth < 640 || courses.length > 3) {
        arrowsContainer.classList.remove("hidden")
      } else {
        arrowsContainer.classList.add("hidden")
      }
    }
  }

  useEffect(() => {
    updateArrowVisibility(audience)
  }, [])

  return (
    <div className="min-h-screen bg-[#1a3937] overflow-x-hidden">
      {/* Header */}
      <header className="bg-[#1d4b4b] py-4 border-b border-white/10 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-6 lg:px-8 max-w-7xl space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Convivencia_GOB%20MEX_TRABAJO-SNE-q35uwdS1c9gOQbWMk14WSWp1yOty0A.svg"
              alt="Gobierno de México"
              width={280}
              height={40}
              className="h-12 w-auto"
              priority
            />
          </div>
          <div className="flex items-center space-x-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A2l4Ac1kVeIvIfTFyxnI4DcwlBTWXG.png"
              alt="Microsoft"
              width={80}
              height={40}
              className="h-12 w-auto"
            />
            <div className="h-8 w-px bg-white/20" aria-hidden="true" />
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20RED%20Blanco%20(1)-aOgZnWq8IiV76ENJY1xP4O2Foqs7hA.png"
              alt="Red por la ciberseguridad"
              width={200}
              height={55}
              className="h-12 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                Desarrolla <span className="text-emerald-500">habilidades digitales</span> para el ámbito laboral
              </h1>
              <p className="text-teal-100 text-lg">
                Acércate al mundo de la Inteligencia Artificial (IA) y{" "}
                <span className="text-emerald-500 font-semibold">mejora tus habilidades</span> para desarrollar tu
                carrera laboral o la gestión de tus Recursos Humanos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => {
                    document.querySelector("#cursos")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  <span className="mr-2">🎓</span> Encuentra tu Curso Ideal
                </Button>
                <Button
                  className="bg-white hover:bg-gray-100 text-emerald-600 font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-emerald-500"
                  onClick={() => {
                    const chatSection = document.querySelector("#chat-section")
                    if (chatSection) {
                      chatSection.scrollIntoView({ behavior: "smooth" })
                    }
                    setChatInput("¿Qué necesito saber para empezar con IA?")
                  }}
                >
                  <span className="mr-2">📚</span> Empieza a Aprender
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] flex items-center justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background_removed_image_g3UrbmelRIaReC6peABkWg-LFqAZKzJV2gxmNUZnzi5nsPE7ngFsl.png"
                alt="AI Robot in Business Attire"
                width={500}
                height={500}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section with White Background */}
      <section
        id="chat-section"
        className="w-full bg-gradient-to-br from-white to-emerald-50 py-12 sm:py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg\,#fff\,rgba(255\,255\,255\,0.4))] opacity-50"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl backdrop-blur-sm bg-white/50 rounded-2xl shadow-lg">
          <div className="text-center space-y-8 py-12 sm:py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 leading-tight">
              ¿Cómo iniciar con el uso de la <span className="text-emerald-600">IA para el trabajo</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Conversa con nuestro chatbot y descubre las infinitas posibilidades que la Inteligencia Artificial puede
              ofrecer en tu carrera.
            </p>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex items-center mb-8">
                <Input
                  placeholder="Escribe tu pregunta aquí..."
                  className="w-full pl-6 pr-24 py-6 rounded-full border-2 border-teal-200 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 text-lg shadow-sm"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <Button className="absolute right-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-full px-8 py-6 font-medium transition-colors duration-200">
                  Enviar
                </Button>
              </div>
              <div className="relative w-full overflow-hidden px-2 sm:px-4">
                <div
                  className="flex gap-4 transition-transform duration-300 ease-in-out mx-auto max-w-full sm:max-w-[calc(100%+1rem)] lg:max-w-[calc(100%+2rem)]"
                  style={{ transform: `translateX(-${currentIndices[0] * (100 / visibleCards)}%)` }}
                >
                  {questions.map((question, index) => (
                    <QuestionCard key={index} index={index} question={question} onClick={handleQuestionClick} />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  onClick={() => changeQuestion(false)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 z-10"
                  aria-label="Show previous question"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => changeQuestion(true)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 z-10"
                  aria-label="Show next question"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-[#1d4b4b] py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">¿Por qué es importante aprender de IA?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <button className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200">
                  <div className={`${feature.color} w-8 h-8 rounded-full flex items-center justify-center`}>
                    {React.createElement(feature.icon, { className: "h-4 w-4 text-white" })}
                  </div>
                  <span className="text-white font-medium">{feature.title}</span>
                </button>
                <div className="absolute z-10 left-0 top-full mt-2 w-72 p-4 rounded-lg bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                  <p className="text-gray-700 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="w-full py-16 bg-gradient-to-br from-gray-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg\,#fff\,rgba(255\,255\,255\,0.5))] opacity-25"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-2">
            <span className="text-emerald-600 font-bold text-3xl">Capacitación</span>{" "}
            <span className="text-3xl font-bold text-emerald-800">en IA</span>
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            {audience === "job-seekers"
              ? "Te recomendamos algunos cursos para que inicies el uso de la Inteligencia Artificial en tu búsqueda de trabajo y desarrollo profesional."
              : "Descubre cómo la Inteligencia Artificial puede transformar y optimizar los procesos en tu empresa."}
          </p>
          <div className="flex justify-center items-center mb-12">
            <div className="bg-emerald-200 p-1 rounded-full flex items-center shadow-md">
              <button
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  audience === "job-seekers"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-emerald-800 hover:bg-emerald-300"
                }`}
                onClick={() => {
                  setAudience("job-seekers")
                  updateArrowVisibility("job-seekers")
                }}
              >
                Personas en busca de Trabajo
              </button>
              <button
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  audience === "companies"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-emerald-800 hover:bg-emerald-300"
                }`}
                onClick={() => {
                  setAudience("companies")
                  updateArrowVisibility("companies")
                }}
              >
                Empresas
              </button>
            </div>
          </div>
          <div className="relative">
            <Slider ref={sliderRef} {...sliderSettings}>
              {(audience === "job-seekers" ? jobSeekersCourses : companiesCourses).map((course, index) => (
                <div key={index} className="px-2">
                  <Card className="overflow-hidden h-[400px] flex flex-col">
                    <div className={`bg-gradient-to-r ${course.gradient} p-8 h-[120px]`}>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                        {React.createElement(course.icon, { className: "h-6 w-6 text-white" })}
                      </div>
                      <p className="text-sm text-emerald-100">{course.category}</p>
                    </div>
                    <CardContent className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <p className="text-gray-600 line-clamp-3">{course.description}</p>
                      </div>
                      <Button variant="outline" className="mt-4">
                        Ir al curso
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
            <div className="slider-arrows hidden">
              <Button
                variant="ghost"
                onClick={() => sliderRef.current?.slickPrev()}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 z-10"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                onClick={() => sliderRef.current?.slickNext()}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 z-10"
                disabled={
                  currentSlide === (audience === "job-seekers" ? jobSeekersCourses : companiesCourses).length - 3
                }
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Courses Section */}
      <section className="w-full py-24 bg-gradient-to-br from-white to-gray-100 relative overflow-hidden">
        {/* Left decorative banner */}
        <div className="absolute left-0 top-0 h-full w-64 lg:w-96">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banda%20de%20gobierno%203-4-cNhzQ2njeohlK6UkQSuBsBL0DXkSII.png"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Right decorative banner */}
        <div className="absolute right-0 top-0 h-full w-64 lg:w-96">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banda%20de%20gobierno%20completo-LZ4fkS729EV3LOwqsszj3zrbWvy3bL.png"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-center mb-16">
            <span className="text-[#862041] font-bold text-4xl bg-white px-6 py-3 rounded-lg shadow-lg inline-block">
              Inteligencia Artificial para Mujeres Buscadoras de Empleo
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-16 lg:px-24">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#862041]">Preparación para una entrevista laboral</h3>
                <p className="text-gray-600 mb-6">Superando las barreras y prejuicios.</p>
                <Button
                  variant="outline"
                  className="w-full border-[#862041] text-[#862041] hover:bg-[#862041] hover:text-white transition-colors duration-300"
                >
                  Ir al curso
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#862041]">
                  Aplicación de la IA para manejo de situaciones de violencia
                </h3>
                <p className="text-gray-600 mb-6">En la vida y en el trabajo.</p>
                <Button
                  variant="outline"
                  className="w-full border-[#862041] text-[#862041] hover:bg-[#862041] hover:text-white transition-colors duration-300"
                >
                  Ir al curso
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#862041]">
                  Manejo de Herramientas de comunicación a distancia
                </h3>
                <p className="text-gray-600 mb-6">Mejora tus habilidades de comunicación remota.</p>
                <Button
                  variant="outline"
                  className="w-full border-[#862041] text-[#862041] hover:bg-[#862041] hover:text-white transition-colors duration-300"
                >
                  Ir al curso
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#862041]">Manejo de Herramientas de Oficina</h3>
                <p className="text-gray-600 mb-6">Domina las herramientas esenciales para el trabajo de oficina.</p>
                <Button
                  variant="outline"
                  className="w-full border-[#862041] text-[#862041] hover:bg-[#862041] hover:text-white transition-colors duration-300"
                >
                  Ir al curso
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-[#862041]">
                  Estrategias y herramientas digitales para el autoempleo
                </h3>
                <p className="text-gray-600 mb-6">Descubre cómo emprender en la era digital.</p>
                <Button
                  variant="outline"
                  className="w-full border-[#862041] text-[#862041] hover:bg-[#862041] hover:text-white transition-colors duration-300"
                >
                  Ir al curso
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#163737] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">
                Micrositio Inteligencia Artificial para el empleo
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Este sitio es parte de una alianza entre la Secretaría del Trabajo y Previsión Social a través del
                Servicio Nacional de Empleo, Microsoft y Red por la Ciberseguridad.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Sitios de interés</h3>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li>
                  <Link
                    href="https://aka.ms/AISkillsNavigator"
                    className="hover:text-emerald-400 transition-colors flex items-center"
                  >
                    <ExternalLink className="h-4 w4 w-4 mr-2" />
                    <span>Cursos de Inteligencia Artificial de Microsoft</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.gob.mx/empleo"
                    className="hover:text-emerald-400 transition-colors flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Portal del Empleo</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.observatoriolaboral.gob.mx/"
                    className="hover:text-emerald-400 transition-colors flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Observatorio Laboral</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://ferias.empleo.gob.mx/content/common/home.jsf"
                    className="hover:text-emerald-400 transition-colors flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Ferias de Empleo</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.redporlaciberseguridad.org"
                    className="hover:text-emerald-400 transition-colors flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span>Red por la Ciberseguridad</span>
                  </Link>{" "}
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">Contacto</h3>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span>contacto@redporlaciberseguridad.org</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <div className="flex justify-center space-x-4 mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logosBCO-Biw7KyHo590eCAsxqFKTzbk6jHY3V2.png"
                alt="Gobierno de México"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A2l4Ac1kVeIvIfTFyxnI4DcwlBTWXG.png"
                alt="Microsoft"
                width={80}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20RED%20Blanco%20(1)-aOgZnWq8IiV76ENJY1xP4O2Foqs7hA.png"
                alt="Red por la ciberseguridad"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Todos los derechos reservados. Inteligencia Artificial para el empleo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

