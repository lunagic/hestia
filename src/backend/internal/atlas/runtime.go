package atlas

import (
	"context"
	"io"
	"io/fs"
	"os"

	"github.com/lunagic/hestia/src/backend/internal/forge"
)

type Runtime struct {
	Arguments   []string
	Hostname    string
	Context     context.Context
	Environment forge.Environment
	FileSystem  fs.FS
	Stderr      io.Writer
	Stdin       io.Reader
	Stdout      io.Writer
}

func RuntimeDefault() Runtime {
	return Runtime{
		Arguments:   os.Args,
		Context:     context.Background(),
		Environment: forge.NewEnvironmentFromSystem(),
		FileSystem:  os.DirFS("."),
		Stderr:      os.Stderr,
		Hostname: func() string {
			hostname, err := os.Hostname()
			if err != nil {
				return "localhost"
			}

			return hostname
		}(),
		Stdin:  os.Stdin,
		Stdout: os.Stdout,
	}
}
