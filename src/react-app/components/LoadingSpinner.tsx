export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-8">
        <div className="relative">
          <img 
            src="https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/lumina-logo-light.png" 
            alt="Lumina" 
            className="h-16 w-auto opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 animate-lumina-fill opacity-80" 
               style={{ 
                 maskImage: 'url(https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/lumina-logo-light.png)',
                 maskSize: 'contain',
                 maskRepeat: 'no-repeat',
                 maskPosition: 'center',
                 WebkitMaskImage: 'url(https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/lumina-logo-light.png)',
                 WebkitMaskSize: 'contain',
                 WebkitMaskRepeat: 'no-repeat',
                 WebkitMaskPosition: 'center'
               }} 
          />
        </div>
      </div>
      <p className="text-body-1 text-secondary animate-fade-in">
        Loading your glow...
      </p>
    </div>
  );
}
