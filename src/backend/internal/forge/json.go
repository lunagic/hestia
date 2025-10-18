package forge

import (
	"encoding/json"
	"fmt"
	"sort"
)

// Recursively sort keys in any JSON-like structure
func sortJSON(v interface{}) (string, error) {
	switch val := v.(type) {
	case map[string]interface{}:
		// Sort keys
		keys := make([]string, 0, len(val))
		for k := range val {
			keys = append(keys, k)
		}
		sort.Strings(keys)

		// Build sorted JSON
		result := "{"
		for i, k := range keys {
			sortedVal, err := sortJSON(val[k])
			if err != nil {
				return "", err
			}
			result += fmt.Sprintf(`"%s":%s`, k, sortedVal)
			if i < len(keys)-1 {
				result += ","
			}
		}
		result += "}"
		return result, nil

	case []interface{}:
		// Sort each element recursively
		result := "["
		for i, item := range val {
			sortedItem, err := sortJSON(item)
			if err != nil {
				return "", err
			}
			result += sortedItem
			if i < len(val)-1 {
				result += ","
			}
		}
		result += "]"
		return result, nil

	default:
		// Marshal primitive types
		raw, err := json.Marshal(val)
		return string(raw), err
	}
}

// MarshalSortedJSON recursively sorts keys in a struct
func MarshalSortedJSON(v interface{}) (string, error) {
	raw, err := json.Marshal(v)
	if err != nil {
		return "", err
	}

	var m interface{}
	if err := json.Unmarshal(raw, &m); err != nil {
		return "", err
	}

	return sortJSON(m)
}
