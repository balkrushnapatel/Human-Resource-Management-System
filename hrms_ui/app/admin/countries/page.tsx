"use client"

import { useState, useEffect } from "react"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Plus, Loader2 } from "lucide-react"

interface Country {
    countryId: number
    countryName: string
    stateCount: number
    cityCount: number
    hospitalCount: number
}

export default function CountriesPage() {
    const [countries, setCountries] = useState<Country[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        fetchCountries()
    }, [])

    const fetchCountries = async () => {
        try {
            const response = await fetch("http://localhost:5284/api/Country/GetAllCountries")
            if (response.ok) {
                const data = await response.json()
                setCountries(data)
            } else {
                console.error("Failed to fetch countries")
            }
        } catch (error) {
            console.error("Error fetching countries:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleExport = () => {
        window.open("http://localhost:5284/api/Country/ExportToExcel", "_blank")
    }

    const filteredCountries = countries.filter(c =>
        c.countryName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background">
            <AdminNav />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
                        <p className="mt-2 text-muted-foreground">Manage countries and view statistics</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleExport}>
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Country
                        </Button>
                    </div>
                </div>

                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search countries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Country List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Country Name</TableHead>
                                        <TableHead className="text-right">States</TableHead>
                                        <TableHead className="text-right">Cities</TableHead>
                                        <TableHead className="text-right">Hospitals</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCountries.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                No countries found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredCountries.map((country) => (
                                            <TableRow key={country.countryId}>
                                                <TableCell>{country.countryId}</TableCell>
                                                <TableCell className="font-medium">{country.countryName}</TableCell>
                                                <TableCell className="text-right">{country.stateCount}</TableCell>
                                                <TableCell className="text-right">{country.cityCount}</TableCell>
                                                <TableCell className="text-right">{country.hospitalCount}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
