import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useEffect, useState } from "react"

export interface Blog {
    title: string,
    content: string,
    id: number,
    author: {
        name: string
    }
}

export const useBlogs = (_p0?: { id: string }) => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                setBlogs(res.data.blogs)
                setLoading(false)
            })
    }, [])

    return {
        loading,
        blogs
    }
}

export const useBlog = (id: string) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog | null>(null)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => {
                setBlog(res.data.blog)
                setLoading(false)
            })
    }, [id])

    return {
        loading,
        blog
    }
}