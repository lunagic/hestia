package atlas

import (
	"io/fs"
	"net/http"
	"strings"

	"github.com/lunagic/poseidon/poseidon"
	"github.com/spf13/cobra"
)

type ConfigurationFunc func(app *App) error

func WithHandler(path string, handler http.Handler) ConfigurationFunc {
	return func(app *App) error {
		app.mux[path] = handler

		return nil
	}
}

func WithCommand(use string, cmd *cobra.Command) ConfigurationFunc {
	return func(app *App) error {
		cmd.Use = use
		app.Commands[use] = cmd

		return nil
	}
}

func WithFrontendVite(
	path string,
	fileSystem fs.FS,
	thing func(r *http.Request) poseidon.SSRPayload,
	middleware ...poseidon.Middleware,
) ConfigurationFunc {
	return func(app *App) error {

		t := bla(func(r *http.Request) poseidon.SSRPayload {
			manifest, err := fileSystem.Open(".vite/manifest.json")
			if err != nil {
				panic(err)
			}

			x := thing(r)
			x.Assets = poseidon.SSRAssetsFromViteManifest(manifest, "index.tsx")

			return x
		})

		frontend, err := poseidon.New(
			fileSystem,
			poseidon.WithClientSideRoutingAndServerSideRendering(
				t,
				middleware...,
			),
			poseidon.WithCachePolicy(func(s string) bool {
				return strings.HasPrefix(s, "/assets/")
			}),
		)
		if err != nil {
			return err
		}

		return WithHandler(path, frontend)(app)
	}
}

type bla func(r *http.Request) poseidon.SSRPayload

func (b bla) HandleRequest(r *http.Request) poseidon.SSRPayload {
	return b(r)
}
