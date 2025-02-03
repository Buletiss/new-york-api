import { booksApi, articleApi } from "../../services/api";
import { useEffect, useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import "@/app/globals.css";
import HandleLogout from "@/components/handleLogout";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useUserAuth } from "@/hooks/useUserAuth";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Book {
  book_image: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  buy_links: {
    url: string;
    name: string;
  }[];
}

interface Article {
  id: number;
  title: string;
  author: string;
  buy_links: string;
  buy_lins: {
    url: string;
    name: string;
  };
  url: string;
  headline: {
    main: string;
  };
  publisher: string;
  description: string;
  book_image: string;
  abstract: string;
  web_url: string;
  type_of_material: string;
  lead_paragraph: string;
  pub_date: string;
  section_name: string;
  byline: {
    original: string;
  };
  word_count: number;
  keywords: { value: string }[];
}

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const [book, setBook] = useState<Book[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useUserAuth();

  const getBooks = async (searchQuery: string) => {
    try {
      setLoading(true);
      if (!searchQuery) {
        return;
      }
      const response = await booksApi.get(`${encodeURIComponent(searchQuery)}`);
      // console.log("response", response.data);
      setBook(response.data.results.books || []);
      setArticles([]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const getArticles = async () => {
    try {
      setLoading(true);
      const response = await articleApi.get("");
      setArticles(response.data.response.docs || []);
      console.log("response", response.data.response.docs);
      setBook([]);
    } catch (error) {
      console.log("error article ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    getBooks(searchQuery);
  };

  return (
    <SidebarProvider>
      <AppSidebar
        search={handleSearch}
        fetchItem={getBooks}
        fetchArticles={getArticles}
      />
      <SidebarInset>
        <header className="flex bg-prussian-blue justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex flex-row items-center gap-2 ">
            <SidebarTrigger className="-ml-1 bg-white" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" className="text-white">
                    livros
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className="text-white
                  "
                  >
                    Data Fetching
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-row items-center gap-2">
            <HandleLogout />
            <Button variant="outline">
              <Link href="/profile">Profile</Link>
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.image} alt="avatar" />
            </Avatar>
          </div>
        </header>
        <div className="bg-eggshell h-full">
          {loading ? (
            <div className="flex flex-1 flex-row gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          ) : book.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-6 p-6">
              {book.map((bookItem, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg max-w-[25rem] w-full max-h-[35rem] w-full overflow-hidden"
                >
                  <div className="p-6">
                    <img
                      src={bookItem.book_image}
                      alt={bookItem.title}
                      className="w-full h-[200px] object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                      {bookItem.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 ">
                      {bookItem.description}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 font-semibold">
                      Publisher:
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {bookItem.publisher}
                    </p>
                    <div className="mt-4">
                      {bookItem.buy_links && bookItem.buy_links[0] && (
                        <a
                          href={bookItem.buy_links[0]?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Buy here: {bookItem.buy_links[0]?.name}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : articles ? (
            <div className="flex flex-row flex-wrap gap-4 p-4">
              {articles.map((article, index: number) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg shadow-lg max-w-[30rem] w-full max-h-[40rem] h-screen bg-white"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {article.headline.main}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {article.abstract}
                  </p>

                  <a
                    href={article.web_url}
                    className="text-blue-600 hover:underline mb-2 block"
                  >
                    Ler o artigo completo
                  </a>

                  <div className="bg-gray-100 p-3 rounded-md mb-4">
                    <p className="text-sm text-gray-500">
                      Type: {article.type_of_material}
                    </p>
                    <p className="text-sm text-gray-500">
                      Lead: {article.lead_paragraph}
                    </p>
                    <p className="text-sm text-gray-500">
                      Published on: {article.pub_date}
                    </p>
                    <p className="text-sm text-gray-500">
                      Section: {article.section_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Byline: {article.byline.original}
                    </p>
                    <p className="text-sm text-gray-500">
                      Word count: {article.word_count}
                    </p>
                  </div>

                  <div className="bg-gray-100 p-2 rounded-md">
                    <h3 className="font-medium text-gray-800">Keywords</h3>
                    <ul className="list-none space-y-1 mt-2">
                      {article.keywords
                        .slice(0, 2)
                        .map((keywordItems, index: number) => (
                          <li key={index} className="text-sm text-blue-600">
                            {keywordItems.value}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : query ? (
            <p className="h-screen">nenhum resultado</p>
          ) : (
            <p className="h-screen">Bem vindo ao New Times York</p>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
