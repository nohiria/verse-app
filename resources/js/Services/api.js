export async function fetchVerseOfTheDay() {
    try {
      const response = await fetch("http://verse-app.local/api/verse-of-the-day");
      if (!response.ok) throw new Error("Error al obtener el verso");
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return { text: "No se pudo obtener el verso", book: "Error", chapter: 0, verse: 0 };
    }
  }