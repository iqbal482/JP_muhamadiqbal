package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type RumahSakitRujukan struct {
	NamaRumahSakit string `json:"nama_rumah_sakit"`
	Alamat         string `json:"alamat"`
	KotaMadya      string `json:"kota_madya"`
	Kelurahan      string `json:"kelurahan"`
	Kecamatan      string `json:"kecamatan"`
}
type RumahSakit struct {
	NamaRumahSakit       string      `json:"nama_rumah_sakit"`
	JenisRumahSakit      string      `json:"jenis_rumah_sakit"`
	AlamatRumahSakit     string      `json:"alamat_rumah_sakit"`
	Kelurahan            string      `json:"kelurahan"`
	Kecamatan            string      `json:"kecamatan"`
	KotaKabAdministrasi  string      `json:"kota/kab_administrasi"`
	KodePos              int         `json:"kode_pos"`
	NomorTelepon         *string     `json:"nomor_telepon"`
	NomorFax             *string     `json:"nomor_fax"`
	NoHpDirekturKepalaRs *string     `json:"no_hp_direktur/kepala_rs"`
	Website              interface{} `json:"website"`
	Email                interface{} `json:"email"`
}

type Response struct {
	NamaRumahSakit      string      `json:"nama_rumah_sakit"`
	JenisRumahSakit     string      `json:"jenis_rumah_sakit"`
	AlamatRumahSakit    string      `json:"alamat_rumah_sakit"`
	Kelurahan           string      `json:"kelurahan"`
	Kecamatan           string      `json:"kecamatan"`
	KotaKabAdministrasi string      `json:"kota/kab_administrasi"`
	KodePos             int         `json:"kode_pos"`
	NomorTelepon        *string     `json:"nomor_telepon"`
	NomorFax            *string     `json:"nomor_fax"`
	Website             interface{} `json:"website"`
	Email               interface{} `json:"email"`
}

type health struct {
	Status string
	Code   int16
}

type containRumahSakitRujukans []RumahSakitRujukan
type containRumahSakits []RumahSakit
type containResponses []Response

type response struct {
	Status string
	Code   int16
	Count  int16
	Data   interface{}
}

var RumahSakitRujukans = containRumahSakitRujukans{}
var RumahSakits = containRumahSakits{}
var Responses = containResponses{}

// Api untuk join API
func getRumahSakitUpdate(w http.ResponseWriter, r *http.Request) {
	var newResponse Response
	var response response

	// Get Rumah sakit
	var bodyRS []RumahSakit

	resp, err := http.Get("https://data.jakarta.go.id/read-resource/get-json/rsdkijakarta-2017-10/8e179e38-c1a4-4273-872e-361d90b68434")
	if err != nil {
		log.Fatal(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	defer resp.Body.Close()

	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	err = json.Unmarshal(bodyBytes, &bodyRS)

	for i := range bodyRS {
		RumahSakits = append(RumahSakits, bodyRS[i])
	}

	// Get Rumah sakit rujukan
	var bodyRSJ []RumahSakitRujukan
	resp, err = http.Get("https://data.jakarta.go.id/read-resource/get-json/daftar-rumah-sakit-rujukan-penanggulangan-covid-19/65d650ae-31c8-4353-a72b-3312fd0cc187")
	if err != nil {
		log.Fatal(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
	}
	defer resp.Body.Close()

	bodyBytes, err = ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err.Error())
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	err = json.Unmarshal(bodyBytes, &bodyRSJ)
	for i := range bodyRSJ {
		RumahSakitRujukans = append(RumahSakitRujukans, bodyRSJ[i])
	}

	for _, rs := range RumahSakits {
		for _, rsj := range RumahSakitRujukans {
			if strings.ToUpper(rs.AlamatRumahSakit) == rsj.Alamat {
				fmt.Println(strings.ToUpper(rsj.Alamat))
				newResponse.NamaRumahSakit = rs.NamaRumahSakit
				newResponse.JenisRumahSakit = "Rumah Sakit Rujukan"
				newResponse.AlamatRumahSakit = rs.AlamatRumahSakit
				newResponse.Kelurahan = rs.Kelurahan
				newResponse.Kecamatan = rs.Kecamatan
				newResponse.KotaKabAdministrasi = rs.KotaKabAdministrasi
				newResponse.KodePos = rs.KodePos
				newResponse.NomorTelepon = rs.NomorTelepon
				newResponse.NomorFax = rs.NomorFax
				newResponse.Website = rs.Website
				newResponse.Email = rs.Email
				Responses = append(Responses, newResponse)
			}
		}

		newResponse.NamaRumahSakit = rs.NamaRumahSakit
		newResponse.JenisRumahSakit = "Rumah Sakit Umum"
		newResponse.AlamatRumahSakit = rs.AlamatRumahSakit
		newResponse.Kelurahan = rs.Kelurahan
		newResponse.Kecamatan = rs.Kecamatan
		newResponse.KodePos = rs.KodePos
		newResponse.NomorTelepon = rs.NomorTelepon
		newResponse.NomorFax = rs.NomorFax
		newResponse.Website = rs.Website
		newResponse.Email = rs.Email
		Responses = append(Responses, newResponse)
	}

	response.Code = http.StatusOK
	response.Status = "Sukses"
	response.Count = int16(len(Responses))
	response.Data = Responses

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// Api untuk filter
func filterRumahSakit(w http.ResponseWriter, r *http.Request) {
	//var newResponse Response
	var temp []interface{}
	var response response
	var kelurahan, kecamatan, kabupaten string

	kecamatan = r.URL.Query().Get("kecamatan")
	kabupaten = r.URL.Query().Get("kabupaten")
	kelurahan = r.URL.Query().Get("kelurahan")

	// kelurahan = w.Header().Get("kelurahan")
	for i := range Responses {
		if Responses[i].Kelurahan == kelurahan && Responses[i].Kecamatan == kecamatan && Responses[i].KotaKabAdministrasi == kabupaten {
			fmt.Println(Responses[i], kelurahan, kecamatan, kabupaten)
			temp = append(temp, Responses[i])
		} else {
			if (Responses[i].Kecamatan == kecamatan || Responses[i].KotaKabAdministrasi == kabupaten) && Responses[i].Kelurahan == kelurahan {
				fmt.Println(Responses[i].Kelurahan, kelurahan, kecamatan, kabupaten)
				temp = append(temp, Responses[i])
			}
			if (Responses[i].Kelurahan == kelurahan || Responses[i].KotaKabAdministrasi == kabupaten) && Responses[i].Kecamatan == kecamatan {
				fmt.Println(Responses[i].Kecamatan, kelurahan, kecamatan, kabupaten)
				temp = append(temp, Responses[i])
			}
			if (Responses[i].Kelurahan == kelurahan && Responses[i].Kecamatan == kecamatan) && Responses[i].KotaKabAdministrasi == kabupaten {
				fmt.Println(Responses[i].Kecamatan, kelurahan, kecamatan, kabupaten)
				temp = append(temp, Responses[i])
			}
		}
	}

	response.Code = http.StatusOK
	response.Status = "Sukses"
	response.Count = int16(len(Responses))
	response.Data = temp

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
	temp = nil
	// response.Data = nil
}

func getHealth(w http.ResponseWriter, r *http.Request) {
	s := health{"Good", http.StatusOK}
	resp, err := json.Marshal(s)
	// Check conditional
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	// Status http Check
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(resp)
}

func commonMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func handler() {
	handlerGolang := mux.NewRouter().StrictSlash(true)
	handlerGolang.Use(commonMiddleware)
	handlerGolang.HandleFunc("/joinAPI", getRumahSakitUpdate).Methods("GET")
	handlerGolang.HandleFunc("/health", getHealth).Methods("GET")
	handlerGolang.HandleFunc("/search", filterRumahSakit).Methods("GET")
	log.Fatal(http.ListenAndServe(":9090", handlerGolang))
}

func main() {
	fmt.Println("Dinkes DKI Jakarta - JP_muhammad.iqbal")
	handler()
}
