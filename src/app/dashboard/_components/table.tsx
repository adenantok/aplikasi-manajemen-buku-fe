"use client";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  user_id: number;
  title: string;
  author: string;
  description: string;
}

export const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [token, setToken] = useState<string | null>(null);

  async function fetchBooks() {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8080/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          setBooks(result.data);
        }
      }
    } catch (error) {
        console.error("Error fetching books:", error);
      }
  }

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) setToken(tokenFromStorage);
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard Buku</h1>
      {books.length === 0 ? (
        <p className="text-gray-600">Data buku belum tersedia.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">Penulis</th>
                <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{book.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


