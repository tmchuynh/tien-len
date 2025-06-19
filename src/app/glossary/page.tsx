"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { glossaryData } from "@/lib/constants/cards/glossary";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MerriamWebsterResponse {
  meta?: {
    id: string;
    uuid?: string;
    sort?: string;
    src?: string;
    section?: string;
    stems?: string[];
    offensive?: boolean;
  };
  hwi?: {
    hw: string;
    prs?: Array<{
      mw?: string;
      sound?: {
        audio?: string;
      };
    }>;
  };
  fl?: string; // functional label (part of speech)
  shortdef?: string[]; // short definitions
  def?: Array<{
    sseq: Array<Array<Array<string | object>>>;
  }>;
}

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiDefinitions, setApiDefinitions] = useState<
    Record<string, MerriamWebsterResponse>
  >({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  // Fetch definition from Merriam-Webster Dictionary API
  const fetchDefinition = async (word: string) => {
    if (apiDefinitions[word] || loading[word]) return;

    setLoading((prev) => ({ ...prev, [word]: true }));

    try {
      const response = await fetch(
        `/api/dictionary?word=${encodeURIComponent(word)}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setApiDefinitions((prev) => ({
            ...prev,
            [word]: data[0],
          }));
        }
      }
    } catch (error) {
      console.error(`Failed to fetch definition for ${word}:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [word]: false }));
    }
  };

  // Filter functions
  const getFilteredCustomTerms = (category: string) => {
    const terms = glossaryData.custom[
      category as keyof typeof glossaryData.custom
    ] as Array<{
      term: string;
      definition: string;
      pronunciation: string;
      example?: string;
      category: string;
    }>;
    return terms.filter(
      (term) =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredVietnameseTerms = (category: string) => {
    const terms = glossaryData.vietnamese[
      category as keyof typeof glossaryData.vietnamese
    ] as Array<{
      term: string;
      vietnamese: string;
      definition: string;
      pronunciation: string;
      literal?: string;
      example?: string;
      culturalNote?: string;
      category: string;
    }>;
    return terms.filter(
      (term) =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getFilteredBasicTerms = (category: string) => {
    const terms = glossaryData.basic[
      category as keyof typeof glossaryData.basic
    ] as string[];
    return terms.filter((term) =>
      term.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Component for rendering basic terms with API definitions
  const BasicTermCard = ({ term }: { term: string }) => {
    useEffect(() => {
      fetchDefinition(term);
    }, [term]);

    const definition = apiDefinitions[term];
    const isLoading = loading[term];

    return (
      <Card className="bg-white/90 hover:bg-white/95 backdrop-blur-sm p-4 transition-all">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-green-800 text-lg capitalize">
              {term}
            </h4>
            {definition?.hwi?.prs?.[0]?.mw && (
              <Badge variant="outline" className="text-xs">
                /{definition.hwi.prs[0].mw}/
              </Badge>
            )}
          </div>

          {isLoading ? (
            <div className="animate-pulse">
              <div className="bg-gray-200 mb-2 rounded w-3/4 h-4"></div>
              <div className="bg-gray-200 rounded w-1/2 h-4"></div>
            </div>
          ) : definition ? (
            <div className="space-y-2">
              <p className="text-gray-700 text-sm">
                {definition.fl && (
                  <span className="font-medium text-green-700">
                    {definition.fl}:
                  </span>
                )}{" "}
                {definition.shortdef?.[0] || "Definition not available"}
              </p>
              {definition.shortdef?.[1] && (
                <p className="text-gray-600 text-xs">
                  Also: {definition.shortdef[1]}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Loading definition...</p>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="bg-gradient-to-br min-h-screen table-felt">
      <div className="mx-auto px-4 py-8 container">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="drop-shadow-2xl mb-4 font-bold font-serif text-5xl text-white">
            📚 Tiến Lên Glossary
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-green-100 text-lg">
            Complete dictionary of Tiến Lên terminology, from basic card terms
            to advanced Vietnamese expressions. Master the language of the game!
          </p>
          <Link href="/how-to-play">
            <Button variant="card" size="lg" className="mb-6">
              ← Back to Rules
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mx-auto mb-8 max-w-md">
          <Input
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/90 backdrop-blur-sm border-green-300"
          />
        </div>

        {/* Glossary Content */}
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-3 bg-green-800/30 backdrop-blur-sm mb-8 w-full">
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-green-600 text-white"
            >
              🃏 Basic Terms
            </TabsTrigger>
            <TabsTrigger
              value="advanced"
              className="data-[state=active]:bg-green-600 text-white"
            >
              🎯 Tiến Lên Terms
            </TabsTrigger>
            <TabsTrigger
              value="vietnamese"
              className="data-[state=active]:bg-green-600 text-white"
            >
              🇻🇳 Vietnamese
            </TabsTrigger>
          </TabsList>

          {/* Basic Terms Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h2 className="mb-4 font-bold text-3xl text-green-800">
                🃏 Basic Card Terms
              </h2>
              <p className="mb-6 text-gray-600">
                Fundamental playing card terminology with definitions from
                Merriam-Webster Dictionary API.
              </p>

              {Object.entries(glossaryData.basic).map(([category, terms]) => {
                const filteredTerms = getFilteredBasicTerms(category);
                if (filteredTerms.length === 0 && searchTerm) return null;

                return (
                  <div key={category} className="mb-8">
                    <h3 className="mb-4 font-semibold text-green-700 text-xl capitalize">
                      {category.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </h3>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {filteredTerms.map((term) => (
                        <BasicTermCard key={term} term={term} />
                      ))}
                    </div>
                    {category !== "combinations" && (
                      <Separator className="mt-8" />
                    )}
                  </div>
                );
              })}
            </Card>
          </TabsContent>

          {/* Advanced Terms Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h2 className="mb-4 font-bold text-3xl text-green-800">
                🎯 Tiến Lên Specific Terms
              </h2>
              <p className="mb-6 text-gray-600">
                Specialized terminology unique to Tiến Lên and climbing card
                games.
              </p>

              {Object.entries(glossaryData.custom).map(([category, terms]) => {
                const filteredTerms = getFilteredCustomTerms(category);
                if (filteredTerms.length === 0 && searchTerm) return null;

                return (
                  <div key={category} className="mb-8">
                    <h3 className="mb-4 font-semibold text-green-700 text-xl capitalize">
                      {category.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </h3>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {filteredTerms.map((term, index) => (
                        <Card
                          key={index}
                          className="bg-white/90 hover:bg-white/95 backdrop-blur-sm p-4 transition-all"
                        >
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-green-800 text-lg">
                                {term.term}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {term.pronunciation}
                              </Badge>
                            </div>

                            <p className="text-gray-700 text-sm">
                              {term.definition}
                            </p>

                            {term.example && (
                              <p className="text-gray-600 text-xs">
                                <span className="font-medium">Example:</span>{" "}
                                {term.example}
                              </p>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                    {category !== "winning" && <Separator className="mt-8" />}
                  </div>
                );
              })}
            </Card>
          </TabsContent>

          {/* Vietnamese Terms Tab */}
          <TabsContent value="vietnamese" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm p-6">
              <h2 className="mb-4 font-bold text-3xl text-green-800">
                🇻🇳 Vietnamese Terminology
              </h2>
              <p className="mb-6 text-gray-600">
                Traditional Vietnamese terms used in Tiến Lên, complete with
                pronunciations and cultural context.
              </p>

              {Object.entries(glossaryData.vietnamese).map(
                ([category, terms]) => {
                  const filteredTerms = getFilteredVietnameseTerms(category);
                  if (filteredTerms.length === 0 && searchTerm) return null;

                  return (
                    <div key={category} className="mb-8">
                      <h3 className="mb-4 font-semibold text-green-700 text-xl capitalize">
                        {category.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </h3>
                      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTerms.map((term, index) => (
                          <Card
                            key={index}
                            className="bg-white/90 hover:bg-white/95 backdrop-blur-sm p-4 transition-all"
                          >
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h4 className="font-semibold text-green-800 text-lg">
                                  {term.term}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  Vietnamese
                                </Badge>
                              </div>

                              <div className="flex items-center space-x-2 text-sm">
                                <span className="font-medium text-green-700">
                                  {term.vietnamese}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  {term.pronunciation}
                                </span>
                              </div>

                              {term.literal && (
                                <p className="text-gray-600 text-xs italic">
                                  Literal: "{term.literal}"
                                </p>
                              )}

                              <p className="text-gray-700 text-sm">
                                {term.definition}
                              </p>

                              {term.example && (
                                <p className="text-gray-600 text-xs">
                                  <span className="font-medium">Example:</span>{" "}
                                  {term.example}
                                </p>
                              )}

                              {term.culturalNote && (
                                <p className="text-gray-600 text-xs">
                                  <span className="font-medium">
                                    Cultural Note:
                                  </span>{" "}
                                  {term.culturalNote}
                                </p>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                      {category !== "regional" && (
                        <Separator className="mt-8" />
                      )}
                    </div>
                  );
                }
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <Card className="bg-white/90 backdrop-blur-sm mt-8 p-6">
          <h3 className="mb-4 font-bold text-2xl text-green-800">
            📊 Glossary Stats
          </h3>
          <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="font-bold text-2xl text-blue-800">
                {Object.values(glossaryData.basic).flat().length}
              </div>
              <div className="text-gray-600 text-sm">Basic Terms</div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="font-bold text-2xl text-green-800">
                {Object.values(glossaryData.custom).flat().length}
              </div>
              <div className="text-gray-600 text-sm">Tiến Lên Terms</div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <div className="font-bold text-2xl text-red-800">
                {Object.values(glossaryData.vietnamese).flat().length}
              </div>
              <div className="text-gray-600 text-sm">Vietnamese Terms</div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <div className="font-bold text-2xl text-purple-800">
                {Object.values(glossaryData.basic).flat().length +
                  Object.values(glossaryData.custom).flat().length +
                  Object.values(glossaryData.vietnamese).flat().length}
              </div>
              <div className="text-gray-600 text-sm">Total Terms</div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/how-to-play">
            <Button variant="dealer" size="lg" className="px-8 py-4 text-lg">
              📖 Back to Rules
            </Button>
          </Link>
          <Link href="/game">
            <Button variant="winner" size="lg" className="px-8 py-4 text-lg">
              🎮 Start Playing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
