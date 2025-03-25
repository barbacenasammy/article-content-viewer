# Apps Script API Documentation

This document outlines the available endpoints for fetching articles from the Google Apps Script API.

## Base URL

```
https://script.google.com/macros/s/AKfycbz.../exec
```

## Endpoints

### 1. Get All Articles

Fetches all articles in descending order.

**Endpoint:** `GET /exec`

**Parameters:**

- `action` (optional): Set to `getAll` (default)

**Response:**

```json
[
  {
    "title": "Article Title",
    "slug": "article-slug"
  },
  ...
]
```

### 2. Get Article by Slug

Fetches a specific article by its slug.

**Endpoint:** `GET /exec`

**Parameters:**

- `action`: Set to `getBySlug`
- `slug` (required): The unique slug of the article

**Response:**

```json
{
	"content": "Article content...",
	"title": "Article Title"
}
```

**Error Response:**

```json
{
	"error": "Missing slug parameter"
}
```

### 3. Get Paginated Articles

Fetches articles with pagination support.

**Endpoint:** `GET /exec`

**Parameters:**

- `action`: Set to `getPaginated`
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Number of items per page (default: 10)

**Response:**

```json
{
  "page": 1,
  "pageSize": 10,
  "totalItems": 100,
  "totalPages": 10,
  "data": [
    {
      "title": "Article Title",
      "slug": "article-slug"
    },
    ...
  ]
}
```

## Notes

- All responses are in JSON format
- Articles are returned in descending order (newest first)
- The API uses Google Sheets as the data source
- The first row of the spreadsheet is treated as a header and is excluded from the results
