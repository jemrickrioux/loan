package keeper

import (
	"github.com/jemrickrioux/loan/x/loan/types"
)

var _ types.QueryServer = Keeper{}
