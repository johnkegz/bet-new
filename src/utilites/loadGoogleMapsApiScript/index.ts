export const loadGoogleMapsApiScript = () => {
    const apiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
        document.body.removeChild(script);
    };
}
