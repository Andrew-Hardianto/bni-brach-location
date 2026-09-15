export const options = [];

const promises = new Array(10)
    .fill()
    .map((v, i) => fetch(`/kelurahan/list`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }));
Promise.all(promises).then(kelurahanArr => {
    return kelurahanArr.map(value =>
        value
            .json()
            .then(({ Kelurahan_Name, Kelurahan_Code }) =>
                options.kelurahan?.push({ Kelurahan_Name, Kelurahan_Code })
            )
    );
});


const sleep = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

const loadOptions = async (search, prevOptions) => {
    await sleep(1000);

    let filteredOptions;
    if (!search) {
        filteredOptions = options;
    } else {
        const searchLower = search.toLowerCase();

        filteredOptions = options.filter(({ Kelurahan_Name }) =>
            Kelurahan_Name.toLowerCase().includes(searchLower)
        );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
        prevOptions.length,
        prevOptions.length + 10
    );

    return {
        options: slicedOptions,
        hasMore
    };
};

export default loadOptions;
