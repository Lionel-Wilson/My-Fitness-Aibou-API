package models

type GetBmrRequest struct {
	Age    float64 `json:"age" validate:"required,number,gt=0"`
	Height float64 `json:"height" validate:"required,number,gt=0"`
	Weight float64 `json:"weight" validate:"required,number,gt=0"`
	Gender string  `json:"gender" validate:"oneof=Male Female"`
}
