package forge

import (
	"fmt"
	"io/fs"
	"os"
)

type DevSafeFS struct {
	EmbeddedFS   fs.FS
	EmbeddedPath string
	LocalPath    string
}

func (builder DevSafeFS) FS(path string) fs.FS {
	// If localPath exists, return that
	localPath := fmt.Sprintf("%s/%s", builder.LocalPath, path)
	if _, err := os.OpenFile(localPath, os.O_RDONLY, 0655); err == nil {
		return os.DirFS(localPath)
	}

	embeddedPath := fmt.Sprintf("%s/%s", builder.EmbeddedPath, path)
	embeddedFileSystem, err := fs.Sub(builder.EmbeddedFS, embeddedPath)
	PanicErr(err)

	return embeddedFileSystem
}
