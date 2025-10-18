package backend

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/lunagic/hestia/src/backend/internal/atlas"
	"github.com/lunagic/poseidon/poseidon"
)

func Main() {
	atlas.Run(atlas.RuntimeDefault(), &App{})
}

type App struct{}

func (app *App) Configuration(runtime atlas.Runtime) ([]atlas.ConfigurationFunc, error) {
	configuration := []atlas.ConfigurationFunc{
		atlas.WithHandler("/service-worker.js", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			manifest, err := Dist().Open(".vite/manifest.json")
			if err != nil {
				panic(err)
			}

			manifestData := map[string]map[string]any{}
			if err := json.NewDecoder(manifest).Decode(&manifestData); err != nil {
				panic(err)
			}

			jsFile, err := Dist().Open(manifestData["serviceWorker.ts"]["file"].(string))
			if err != nil {
				panic(err)
			}

			w.Header().Add("Content-Type", "text/javascript")

			if _, err := io.Copy(w, jsFile); err != nil {
				panic(err)
			}
		})),
		atlas.WithFrontendVite(
			"/",
			Dist(),
			func(r *http.Request) poseidon.SSRPayload {
				return poseidon.SSRPayload{
					Lang:          "en",
					Title:         "Hestia",
					Description:   "This is Hestia",
					HeaderContent: `<link rel="manifest" href="/manifest.json">`,
				}
			},
		),
	}

	// Database migrations
	// TypeScript
	// Router Struct

	return configuration, nil
}
