{
  "name": "ContactInquiry",
  "type": "object",
  "properties": {
    "full_name": {
      "type": "string",
      "description": "Client's full name"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "Client's email"
    },
    "phone": {
      "type": "string",
      "description": "Phone number"
    },
    "inquiry_type": {
      "type": "string",
      "enum": [
        "consultation",
        "stone_inquiry",
        "custom_design",
        "appraisal",
        "general"
      ],
      "description": "Type of inquiry"
    },
    "gemstone_interest": {
      "type": "string",
      "description": "Specific gemstone or ID they're interested in"
    },
    "budget_range": {
      "type": "string",
      "enum": [
        "under_5k",
        "5k_15k",
        "15k_50k",
        "50k_100k",
        "above_100k",
        "prefer_not_to_say"
      ],
      "description": "Budget range in EUR"
    },
    "message": {
      "type": "string",
      "description": "Detailed message"
    },
    "preferred_language": {
      "type": "string",
      "enum": [
        "de",
        "en",
        "fr"
      ],
      "description": "Preferred communication language"
    },
    "status": {
      "type": "string",
      "enum": [
        "new",
        "contacted",
        "consultation_scheduled",
        "closed"
      ],
      "default": "new",
      "description": "Inquiry status"
    }
  },
  "required": [
    "full_name",
    "email",
    "inquiry_type",
    "message"
  ]
}