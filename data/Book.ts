type bookData = {
    key: string, 
    title: string,
    subtitle: string|null,
    authors: [],
    coverUrl: string, //TODO: add action to get cover of book in apislice
    //TODO: option to upload your own image (i dont know google probably has it)
    description: string,
    isbn: string,
    pageCount: number,
    format: 'digital' | 'audiobook' | 'paperback' | 'hardback',
    genre: string,
}
