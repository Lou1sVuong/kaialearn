import { ethers } from "ethers";
import KaiaLearnNFT_ABI from "@/lib/abi/KaiaLearnNFT.json";
import { toast } from "@/hooks/use-toast";

export async function mintNFT({
  title,
  description,
  score,
}: {
  title: string;
  description: string;
  score: number;
}) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Lấy hợp đồng KaiaLearnNFT đã triển khai
  const contractAddress = "0xe51fd96c6f5285bd0ef4749644c9af6b3d4fa227";
  const contract = new ethers.Contract(
    contractAddress,
    KaiaLearnNFT_ABI,
    signer,
  );

  // Gọi hàm mintCertificate và truyền metadata base64
  const tx = await contract.mintCertificate(title, description, score);
  await tx.wait();
  toast({
    title: "Minted Certificate Successfully",
    description: "You can now view your certificate in your wallet",
  });
}
