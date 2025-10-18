package atlas

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/lunagic/hestia/src/backend/internal/forge"
	"github.com/spf13/cobra"
)

type ConfigurationProvider interface {
	Configuration(runtime Runtime) ([]ConfigurationFunc, error)
}

func Run(
	runtime Runtime,
	appBuilder ConfigurationProvider,
) {
	logger := slog.New(slog.NewJSONHandler(runtime.Stdout, &slog.HandlerOptions{}))

	// Read in env files
	envFilesToCheck := []string{
		".env.local",
		".env",
	}
	for _, envFileToCheck := range envFilesToCheck {
		err := runtime.Environment.IncludeFile(runtime.FileSystem, envFileToCheck)
		forge.PanicErr(err)
	}

	// Get the desired configuration from the app
	configuration, err := appBuilder.Configuration(runtime)
	forge.PanicErr(err)

	// Build the new app
	app, err := newApp(configuration...)
	forge.PanicErr(err)

	serveCmd := &cobra.Command{
		Use: "serve",
		Run: func(cmd *cobra.Command, args []string) {
			mux := http.NewServeMux()
			for path, handler := range app.mux {
				mux.Handle(path, handler)
			}

			server := &http.Server{
				Addr:    "0.0.0.0:2222",
				Handler: mux,
			}
			logger.Info("HTTP Server Listening", "addr", fmt.Sprintf("http://%s", server.Addr))
			err := server.ListenAndServe()
			forge.PanicErr(err)
		},
	}

	rootCmd := &cobra.Command{
		Use: "atlas",
		Run: func(cmd *cobra.Command, args []string) {
			serveCmd.Run(cmd, args)
		},
	}

	for _, subCmd := range app.Commands {
		rootCmd.AddCommand(subCmd)
	}

	rootCmd.AddCommand(serveCmd)

	rootCmd.AddCommand(&cobra.Command{
		Use: "test",
		Run: func(cmd *cobra.Command, args []string) {
		},
	})

	forge.PanicErr(rootCmd.Execute())
}
