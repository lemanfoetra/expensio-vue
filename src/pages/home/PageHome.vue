<template>
    <div>
        <title>Dashboard</title>
        <div class="page-wrapper">
            <!-- Page header -->
            <div class="page-header d-print-none">
                <div class="container-xl">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <h2 class="page-title">
                                Dashboard
                            </h2>
                        </div>

                        <div class="col-auto ms-auto d-print-none">
                            <select class="form-control" v-model="filter">
                                <option value="overview">Overview</option>
                                <option value="pengeluaran">Pengeluaran</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="container-xl">
                <div v-if="filter == 'overview'">
                    <div class="row">
                        <div class="col-sm-6 col-md-3 mb-2">
                            <div class="card card-sm">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span
                                                class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->

                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-moneybag-plus">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path
                                                        d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5" />
                                                    <path
                                                        d="M12.5 21h-4.5a4 4 0 0 1 -4 -4v-1a8 8 0 0 1 14.935 -3.991" />
                                                    <path d="M16 19h6" />
                                                    <path d="M19 16v6" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <div class="font-weight-medium">
                                                <span v-if="!loadingOverview">Rp {{
                                                    formatCurrency(overview.total_pemasukan) }}</span>
                                                <span v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 6l0 -3" />
                                                        <path d="M16.25 7.75l2.15 -2.15" />
                                                        <path d="M18 12l3 0" />
                                                        <path d="M16.25 16.25l2.15 2.15" />
                                                        <path d="M12 18l0 3" />
                                                        <path d="M7.75 16.25l-2.15 2.15" />
                                                        <path d="M6 12l-3 0" />
                                                        <path d="M7.75 7.75l-2.15 -2.15" />
                                                    </svg>
                                                    Memuat ...
                                                </span>
                                            </div>
                                            <div class="text-secondary">
                                                Pemasukan Bulan ini
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-3 mb-2">
                            <div class="card card-sm">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span
                                                class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-moneybag-minus">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path
                                                        d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5" />
                                                    <path d="M12.5 21h-4.5a4 4 0 0 1 -4 -4v-1a8 8 0 0 1 15.943 -.958" />
                                                    <path d="M16 19h6" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <div class="font-weight-medium">
                                                <span v-if="!loadingOverview">Rp {{
                                                    formatCurrency(overview.total_pengeluaran) }}</span>
                                                <span v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 6l0 -3" />
                                                        <path d="M16.25 7.75l2.15 -2.15" />
                                                        <path d="M18 12l3 0" />
                                                        <path d="M16.25 16.25l2.15 2.15" />
                                                        <path d="M12 18l0 3" />
                                                        <path d="M7.75 16.25l-2.15 2.15" />
                                                        <path d="M6 12l-3 0" />
                                                        <path d="M7.75 7.75l-2.15 -2.15" />
                                                    </svg>
                                                    Memuat ...
                                                </span>
                                            </div>
                                            <div class="text-secondary">
                                                Pengeluaran Berjalan
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-3 mb-2">
                            <div class="card card-sm">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span
                                                class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-moneybag">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path
                                                        d="M9.5 3h5a1.5 1.5 0 0 1 1.5 1.5a3.5 3.5 0 0 1 -3.5 3.5h-1a3.5 3.5 0 0 1 -3.5 -3.5a1.5 1.5 0 0 1 1.5 -1.5" />
                                                    <path
                                                        d="M4 17v-1a8 8 0 1 1 16 0v1a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <div class="font-weight-medium">
                                                <span v-if="!loadingOverview">Rp {{
                                                    formatCurrency(overview.total_budget - overview.total_pengeluaran)
                                                    }}</span>
                                                <span v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 6l0 -3" />
                                                        <path d="M16.25 7.75l2.15 -2.15" />
                                                        <path d="M18 12l3 0" />
                                                        <path d="M16.25 16.25l2.15 2.15" />
                                                        <path d="M12 18l0 3" />
                                                        <path d="M7.75 16.25l-2.15 2.15" />
                                                        <path d="M6 12l-3 0" />
                                                        <path d="M7.75 7.75l-2.15 -2.15" />
                                                    </svg>
                                                    Memuat ...
                                                </span>
                                            </div>
                                            <div class="text-secondary">
                                                Sisa Budget
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-3 mb-2">
                            <div class="card card-sm">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span
                                                class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->

                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-pig-money">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M15 11v.01" />
                                                    <path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" />
                                                    <path
                                                        d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <div class="font-weight-medium">
                                                <span v-if="!loadingOverview">Rp {{
                                                    formatCurrency(overview.total_saving) }}</span>
                                                <span v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 6l0 -3" />
                                                        <path d="M16.25 7.75l2.15 -2.15" />
                                                        <path d="M18 12l3 0" />
                                                        <path d="M16.25 16.25l2.15 2.15" />
                                                        <path d="M12 18l0 3" />
                                                        <path d="M7.75 16.25l-2.15 2.15" />
                                                        <path d="M6 12l-3 0" />
                                                        <path d="M7.75 7.75l-2.15 -2.15" />
                                                    </svg>
                                                    Memuat ...
                                                </span>
                                            </div>
                                            <div class="text-secondary">
                                                Estimasi Menabung
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mb-2 mt-2">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Daily Expenses</h4>
                                </div>
                                <div class="card-body">
                                    <div id="cal-heatmap"
                                        style="width: 100%; overflow-y: auto; display: flex; justify-content: center;">
                                    </div>

                                    <div class="accordion-item mt-2">
                                        <div class="accordion-header">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapse-4-tabs"
                                                aria-expanded="false">
                                                Show legend
                                                <div class="accordion-button-toggle">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-1">
                                                        <path d="M6 9l6 6l6 -6"></path>
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                        <div id="collapse-4-tabs" class="accordion-collapse collapse"
                                            data-bs-parent="#accordion-tabs" style="">
                                            <div class="accordion-body">
                                                <div id="legend-graph"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mb-2 mt-2">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Income Distribution</h4>
                                </div>
                                <div class="card-body">
                                    <div id="budget-distribution-chart" style="height: 300px"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="filter == 'pengeluaran'">
                    <div class="row">
                        <div class="col-sm-6 col-md-4 mb-2">
                            <div class="card card-sm">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span
                                                class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-businessplan">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0" />
                                                    <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                                    <path d="M5 15v1m0 -8v1" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <div class="font-weight-medium">
                                                <span v-if="!loadJumlahHariIni">Rp {{
                                                    formatCurrency(jumlahPengeluaranHariIni) }}</span>
                                                <span v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 6l0 -3" />
                                                        <path d="M16.25 7.75l2.15 -2.15" />
                                                        <path d="M18 12l3 0" />
                                                        <path d="M16.25 16.25l2.15 2.15" />
                                                        <path d="M12 18l0 3" />
                                                        <path d="M7.75 16.25l-2.15 2.15" />
                                                        <path d="M6 12l-3 0" />
                                                        <path d="M7.75 7.75l-2.15 -2.15" />
                                                    </svg>
                                                    Memuat ...
                                                </span>
                                            </div>
                                            <div class="text-secondary">
                                                Pengeluaran hari ini
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4 mb-2">
                            <div class="card card-sm">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span
                                                class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-businessplan">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0" />
                                                    <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                                    <path d="M5 15v1m0 -8v1" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <div class="font-weight-medium">
                                                <span v-if="!loadJumlahMingguIni">Rp {{
                                                    formatCurrency(jumlahPengeluaranMingguIni) }}</span>
                                                <span v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 6l0 -3" />
                                                        <path d="M16.25 7.75l2.15 -2.15" />
                                                        <path d="M18 12l3 0" />
                                                        <path d="M16.25 16.25l2.15 2.15" />
                                                        <path d="M12 18l0 3" />
                                                        <path d="M7.75 16.25l-2.15 2.15" />
                                                        <path d="M6 12l-3 0" />
                                                        <path d="M7.75 7.75l-2.15 -2.15" />
                                                    </svg>
                                                    Memuat ...
                                                </span>
                                            </div>
                                            <div class="text-secondary">
                                                Pengeluaran minggu ini
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-4 mb-2">
                            <div class="card card-sm">
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <span
                                                class="bg-facebook text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/brand-facebook -->
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="icon icon-tabler icons-tabler-outline icon-tabler-businessplan">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M16 6m-5 0a5 3 0 1 0 10 0a5 3 0 1 0 -10 0" />
                                                    <path d="M11 6v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M11 10v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M11 14v4c0 1.657 2.239 3 5 3s5 -1.343 5 -3v-4" />
                                                    <path d="M7 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                                    <path d="M5 15v1m0 -8v1" />
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="col">
                                            <div class="font-weight-medium">
                                                <span v-if="!loadJumlahBulanIni">Rp {{
                                                    formatCurrency(jumlahPengeluaranBulanIni) }}</span>
                                                <span v-else>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                        class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 6l0 -3" />
                                                        <path d="M16.25 7.75l2.15 -2.15" />
                                                        <path d="M18 12l3 0" />
                                                        <path d="M16.25 16.25l2.15 2.15" />
                                                        <path d="M12 18l0 3" />
                                                        <path d="M7.75 16.25l-2.15 2.15" />
                                                        <path d="M6 12l-3 0" />
                                                        <path d="M7.75 7.75l-2.15 -2.15" />
                                                    </svg>
                                                    Memuat ...
                                                </span>
                                            </div>
                                            <div class="text-secondary">
                                                Pengeluaran bulan ini
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="modal-title">
                                        Rincian pengeluaran hari ini
                                    </h4>
                                </div>
                                <div class="">
                                    <div v-if="!loadingJumlahHariIni" class="table-responsive">
                                        <table class="table table-hover table-striped table__nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Nominal</th>
                                                    <th>Deskripsi</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="dataDetailPengHariIni.length > 0">
                                                <tr v-for="data in dataDetailPengHariIni" :key="data.id">
                                                    <td>{{ data.nominal }}</td>
                                                    <td>{{ data.deskripsi }}</td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td colspan="2">Belum ada data.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div v-else style="text-align: center; padding: 20px">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 6l0 -3" />
                                            <path d="M16.25 7.75l2.15 -2.15" />
                                            <path d="M18 12l3 0" />
                                            <path d="M16.25 16.25l2.15 2.15" />
                                            <path d="M12 18l0 3" />
                                            <path d="M7.75 16.25l-2.15 2.15" />
                                            <path d="M6 12l-3 0" />
                                            <path d="M7.75 7.75l-2.15 -2.15" />
                                        </svg>
                                        Memuat ...
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="modal-title">Rincian pengeluaran minggu ini</h4>
                                </div>
                                <div>
                                    <div v-if="!loadingDetailMingguIni" class="table-responsive">
                                        <table class="table table-hover table-striped table__nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Tanggal</th>
                                                    <th>Nominal</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="dataDetailPengMingguIni.length > 0">
                                                <tr v-for="data in dataDetailPengMingguIni" :key="data.id">
                                                    <td>{{ data.date }}</td>
                                                    <td>{{ data.nominal }}</td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td colspan="2">Belum ada data.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div v-else style="text-align: center; padding : 20px">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 6l0 -3" />
                                            <path d="M16.25 7.75l2.15 -2.15" />
                                            <path d="M18 12l3 0" />
                                            <path d="M16.25 16.25l2.15 2.15" />
                                            <path d="M12 18l0 3" />
                                            <path d="M7.75 16.25l-2.15 2.15" />
                                            <path d="M6 12l-3 0" />
                                            <path d="M7.75 7.75l-2.15 -2.15" />
                                        </svg>
                                        Memuat ...
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="modal-title">Rincian pengeluaran bulan ini</h4>
                                </div>
                                <div>
                                    <div v-if="!loadingJumlahBulanIni" class="table-responsive">
                                        <table class="table table-hover table-striped table__nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Minggu</th>
                                                    <th>Nominal</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="dataDetailPengBulanIni.length > 0">
                                                <tr v-for="data in dataDetailPengBulanIni" :key="data.id">
                                                    <td>{{ data.date }}</td>
                                                    <td>{{ data.nominal }}</td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td colspan="2">Belum ada data.</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div v-else style="text-align: center; padding : 20px">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="icon icon-tabler icons-tabler-outline icon-tabler-loader">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 6l0 -3" />
                                            <path d="M16.25 7.75l2.15 -2.15" />
                                            <path d="M18 12l3 0" />
                                            <path d="M16.25 16.25l2.15 2.15" />
                                            <path d="M12 18l0 3" />
                                            <path d="M7.75 16.25l-2.15 2.15" />
                                            <path d="M6 12l-3 0" />
                                            <path d="M7.75 7.75l-2.15 -2.15" />
                                        </svg>
                                        Memuat ...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Button trigger modal -->
    <button type="button" id="btnmodalDetailGraphBox" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#modalDetailGraphBox" style="display: none;"></button>
    <div class="modal fade" id="modalDetailGraphBox" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detail</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="isimodalDetailGraphBox">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import {
    pengeluaranHariIni,
    pengeluaranMingguIni,
    pengeluaranBulanIni,
    detailPengeluaranHariIni,
    detailPengeluaranMingguIni,
    detailPengeluaranBulanIni,
    api_dashbaord_overview,
    api_dashbaord_expenses_list,
    api_dashbaord_budget_distribution
} from '../../hooks/dashboard_api';
import CalHeatmap from 'cal-heatmap';
import Legend from 'cal-heatmap/plugins/Legend';
import { formatTanggal, formatYYYYMMDD, timestampToYYYYMMDD, useScreen } from '@/hooks/helpers';
import * as echarts from 'echarts';


const store = useStore();
const loadJumlahHariIni = ref(true);
const jumlahPengeluaranHariIni = ref(0);

const loadJumlahMingguIni = ref(true);
const jumlahPengeluaranMingguIni = ref(0);

const loadJumlahBulanIni = ref(true);
const jumlahPengeluaranBulanIni = ref(0);

const loadingJumlahHariIni = ref(true);
const dataDetailPengHariIni = ref([]);

const loadingDetailMingguIni = ref(true);
const dataDetailPengMingguIni = ref([]);

const loadingJumlahBulanIni = ref(true);
const dataDetailPengBulanIni = ref([]);

const filter = ref('overview');

const { width } = useScreen();

// OVERVIEW PAGE
const loadingOverview = ref(false);
const overview = ref({
    'total_pemasukan': 0,
    'total_pengeluaran': 0,
    'total_budget': 0,
    'total_saving': 0,
});


watch(filter, async (newVal) => {
    if (newVal === 'overview') {
        await loadOverview();
        await loadGrafikHeatmap();
        await loadBudgetDistributionChart();

    } else if (newVal == 'pengeluaran') {
        await loadPengeluaranHariIni();
        await loadPengeluaranMingguIni();
        await loadPengeluaranBulanIni();
        await loadDetailPengeluaranHaiIni();
        await loadDetailPengeluaranMingguIni();
        await loadDetailPengeluaranBulanIni();
    }
})


onMounted(async () => {
    try {
        document.title = "Dashboard";

        await loadOverview();
        await loadGrafikHeatmap();
        await loadBudgetDistributionChart();
    } catch (error) {
        alert(error.message);
    }
})


async function loadPengeluaranHariIni() {
    try {
        loadJumlahHariIni.value = true;
        const token = store.getters.getToken;
        const result = await pengeluaranHariIni(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        jumlahPengeluaranHariIni.value = result.data;
        loadJumlahHariIni.value = false;
    } catch (error) {
        console.log(error);
    }
}


async function loadPengeluaranMingguIni() {
    try {
        loadJumlahMingguIni.value = true;
        const token = store.getters.getToken;
        const result = await pengeluaranMingguIni(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        jumlahPengeluaranMingguIni.value = result.data;
        loadJumlahMingguIni.value = false;
    } catch (error) {
        console.log(error);
    }
}


async function loadPengeluaranBulanIni() {
    try {
        loadJumlahBulanIni.value = true;
        const token = store.getters.getToken;
        const result = await pengeluaranBulanIni(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        jumlahPengeluaranBulanIni.value = result.data;
        loadJumlahBulanIni.value = false;
    } catch (error) {
        console.log(error);
    }
}


async function loadDetailPengeluaranHaiIni() {
    try {
        loadingJumlahHariIni.value = true;
        const token = store.getters.getToken;
        const result = await detailPengeluaranHariIni(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        result.data.forEach(data => {
            dataDetailPengHariIni.value.unshift({
                id: data.id,
                nominal: `Rp ${formatCurrency(data.nominal)}`,
                deskripsi: data.deskripsi,
            });
        });
        loadingJumlahHariIni.value = false;
    } catch (error) {
        loadingJumlahHariIni.value = false;
        console.log(error);
    }
}


async function loadDetailPengeluaranMingguIni() {
    try {
        loadingDetailMingguIni.value = true;
        const token = store.getters.getToken;
        const result = await detailPengeluaranMingguIni(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        let index = 1;
        result.data.forEach(data => {
            dataDetailPengMingguIni.value.push({
                id: index,
                date: `${formatTanggal(data.date)}`,
                nominal: `Rp ${formatCurrency(data.jumlah_nominal)}`,
            });
            index++;
        });
        loadingDetailMingguIni.value = false;
    } catch (error) {
        loadingDetailMingguIni.value = false;
        console.log(error);
    }
}


async function loadDetailPengeluaranBulanIni() {
    try {
        loadingJumlahBulanIni.value = true;
        const token = store.getters.getToken;
        const result = await detailPengeluaranBulanIni(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        let index = 1;
        result.data.forEach(data => {
            dataDetailPengBulanIni.value.push({
                id: index,
                date: `${formatTanggalTanpaNama(data.start)} - ${formatTanggalTanpaNama(data.end)}`,
                nominal: `Rp ${formatCurrency(data.nominal)}`,
            });
            index++;
        });
        loadingJumlahBulanIni.value = false;
    } catch (error) {
        loadingJumlahBulanIni.value = false;
    }
}


async function loadOverview() {
    try {
        loadingOverview.value = true;
        const token = store.getters.getToken;
        const result = await api_dashbaord_overview(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }
        overview.value = result.data;
        loadingOverview.value = false;
    } catch (error) {
        loadingOverview.value = false;
        console.log(error);
    }
}


async function loadGrafikHeatmap() {
    try {
        const min_date = getFirstDateByRange(getRange());

        const token = store.getters.getToken;
        const result = await api_dashbaord_expenses_list(token, formatYYYYMMDD(min_date));
        if (result.success !== true) {
            throw new Error(result.message);
        }
        const dataExpense = result.data;

        // delete inserted html
        document.getElementById('cal-heatmap').innerHTML = '';

        const cal = new CalHeatmap()
        cal.paint(
            {
                itemSelector: '#cal-heatmap',
                domain: {
                    type: 'month',
                    gutter: 24,
                }, // gap between months (px)
                subDomain: {
                    type: 'day',
                    width: 25,
                    height: 25,
                    gutter: 4,
                    label: null  // hilangkan teks di sel (opsional)
                },
                date: {
                    // start: new Date(2020, 4, 15)
                    start: min_date,
                },
                range: getRange(),
                data: {
                    // source: '/data/contributions.json', // ⬅️ LOCAL JSON
                    source: dataExpense,
                    type: 'json',
                    x: 'date',
                    y: 'count'
                },
                scale: {
                    color: {
                        domain: [0, 100000],
                        type: 'linear',
                    },
                },
            },
            [
                [
                    Legend, {
                        width: 300,
                        itemSelector: '#legend-graph',
                    }
                ]
            ]
        )

        cal.on('click', (_, timestamp, value) => {
            const nominal = value > 0 ? value : 0;
            const text = `Pengeluaran pada hari ${formatTanggal(timestampToYYYYMMDD(timestamp))} sebesar <b>Rp${formatCurrency(nominal)}</b>`;
            document.getElementById('btnmodalDetailGraphBox').click();
            document.getElementById('isimodalDetailGraphBox').innerHTML = text;
        });

    } catch (error) {
        console.log(error);
    }
}


async function loadBudgetDistributionChart() {
    try {

        const token = store.getters.getToken;
        const result = await api_dashbaord_budget_distribution(token);
        if (result.success !== true) {
            throw new Error(result.message);
        }

        // https://echarts.apache.org/examples/en/editor.html?c=sankey-simple
        document.getElementById('budget-distribution-chart').innerHTML = "Loading....";

        var chartDom = document.getElementById('budget-distribution-chart');
        if (echarts.getInstanceByDom(chartDom)) {
            echarts.dispose(chartDom)
        }

        var myChart = echarts.init(chartDom);
        var option;


        option = {
            series: {
                type: 'sankey',
                left: 0,
                right: 0,
                top: 0,
                bottom: 10,

                emphasis: {
                    focus: 'adjacency'
                },
                data: result.data.data,
                links: result.data.links,
                label: {
                    show: true,
                    backgroundColor: '#fff',
                    padding: [5, 5],
                    borderRadius: 5,
                    color: '#000',
                    formatter: function (params) {
                        let persentase = 0;
                        if (result.data.pemasukan > 0) {
                            persentase = (params.data.value * 100) / result.data.pemasukan;
                        }

                        if (params.data.name !== 'Pemasukan') {
                            if (persentase > 10) {
                                return params.data.name + ' (' + persentase.toFixed() + '%) \nRp' + params.data.value.toLocaleString('id-ID');
                            }
                            return params.data.name + ' (' + persentase.toFixed() + '%)';
                        }
                        return params.data.name + '\nRp' + params.data.value.toLocaleString('id-ID');
                    }
                }
            }
        };

        option && myChart.setOption(option);
    } catch (error) {
        console.error(error);
    }
}

function formatCurrency(nilai) {
    const formatter = new Intl.NumberFormat('id-ID');
    return formatter.format(nilai);
}


function formatTanggalTanpaNama(tanggalString) {
    const tanggal = new Date(tanggalString);
    const tanggalFormatted = tanggal.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return `${tanggalFormatted}`;
}


function getRange() {
    if (width.value <= 400) {
        return 2;
    } else if (width.value > 400 && width.value < 600) {
        return 3;
    } else if (width.value > 600 && width.value < 750) {
        return 4;
    } else if (width.value > 750 && width.value < 800) {
        return 5;
    } else {
        return 6;
    }
}


function getFirstDateByRange(range) {
    if (!Number.isInteger(range) || range < 1) {
        throw new Error('Range harus bilangan bulat >= 1')
    }

    const date = new Date()
    date.setMonth(date.getMonth() - (range - 1))
    date.setDate(15)
    date.setHours(0, 0, 0, 0)

    return date;
}
</script>

<style scoped>
.dt-paging-button {
    border: 0px solid gray !important;
}

.table__nowrap {
    white-space: nowrap;
}
</style>