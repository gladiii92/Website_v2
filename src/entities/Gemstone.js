{
  "name": "Gemstone",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the gemstone"
    },
    "type": {
      "type": "string",
      "enum": [
        "diamond",
        "ruby",
        "sapphire",
        "emerald",
        "tanzanite",
        "tourmaline",
        "garnet",
        "amethyst",
        "citrine",
        "topaz",
        "peridot",
        "aquamarine",
        "opal",
        "jade",
        "pearl",
        "other"
      ],
      "description": "Type of gemstone"
    },
    "carat_weight": {
      "type": "number",
      "description": "Weight in carats"
    },
    "color": {
      "type": "string",
      "description": "Color description"
    },
    "clarity": {
      "type": "string",
      "enum": [
        "FL",
        "IF",
        "VVS1",
        "VVS2",
        "VS1",
        "VS2",
        "SI1",
        "SI2",
        "I1",
        "I2",
        "I3"
      ],
      "description": "Clarity grade"
    },
    "cut": {
      "type": "string",
      "description": "Cut style and quality"
    },
    "origin": {
      "type": "string",
      "description": "Geographic origin"
    },
    "certification": {
      "type": "string",
      "description": "Certification details"
    },
    "price_eur": {
      "type": "number",
      "description": "Price in Euros"
    },
    "description_de": {
      "type": "string",
      "description": "German description"
    },
    "description_en": {
      "type": "string",
      "description": "English description"
    },
    "description_fr": {
      "type": "string",
      "description": "French description"
    },
    "main_image_url": {
      "type": "string",
      "description": "Primary showcase image"
    },
    "gallery_images": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Additional images"
    },
    "video_url": {
      "type": "string",
      "description": "Video showcase URL"
    },
    "is_featured": {
      "type": "boolean",
      "default": false,
      "description": "Featured on homepage"
    },
    "is_sold": {
      "type": "boolean",
      "default": false,
      "description": "Whether the stone is sold"
    },
    "rarity_level": {
      "type": "string",
      "enum": [
        "exceptional",
        "rare",
        "premium",
        "select"
      ],
      "description": "Rarity classification"
    }
  },
  "required": [
    "name",
    "type",
    "price_eur"
  ]
}