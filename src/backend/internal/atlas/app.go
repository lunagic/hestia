package atlas

import (
	"context"
	"net/http"

	"github.com/spf13/cobra"
)

func newApp(
	configFuncs ...ConfigurationFunc,
) (*App, error) {
	app := &App{
		Commands: map[string]*cobra.Command{},
		mux:      map[string]http.Handler{},
	}

	for _, configFunc := range configFuncs {
		if err := configFunc(app); err != nil {
			return nil, err
		}
	}

	return app, nil
}

type App struct {
	mux      map[string]http.Handler
	Commands map[string]*cobra.Command
	BootJobs []func(ctx context.Context) error
	// ScheduledJobs []ScheduledJob // One instance starts these
	// QueuedJobs    []QueuedJob    // Any Node Can Run These
}

// type ScheduledJob struct {
// 	// Track job completion and put on queue
// }
// type QueuedJob struct {
// 	//
// }
